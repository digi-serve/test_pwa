import NotFoundPage from "../pages/404.f7";
import List from "./views/list.f7.jsx";

var routes = [
  {
    path: "/",
    component: (props, { $h, $f7, $on, $store, $update }) => {
      const title = "List of People";
      let allDCs = {};

      // let pageID = "ABPage.id";
      // let Page = AB.pageByID(pageID);
      // Page.datacollections().foreach((dc)=>{
      //   allDCs[dc.id] = $store.getters[dc.id];
      // })

      // for each DC on this Page, do:
      let dcIDs = ["faa9905e-dea8-4c7f-8eb4-98f1e6e66506"];
      dcIDs.forEach((dcID) => {
        allDCs[dcID] = $store.getters[dcID];
      });

      // const people = $store.getters["faa9905e-dea8-4c7f-8eb4-98f1e6e66506"];

      $on("pageInit", (e, page) => {
        // Page.datacollections().foreach((dc)=>{
        // $store.dispatch(
        //   "getAppBuilderData",
        //   dc.id
        // );
        // })

        // do something on page init
        $store.dispatch(
          "getAppBuilderData",
          "faa9905e-dea8-4c7f-8eb4-98f1e6e66506"
        );
      });

      // const openView = (page, data) => {
      //   $f7.view.main.router.navigate(page, {
      //     props: {
      //       data: data,
      //     },
      //     ignoreCache: true,
      //   });
      // };

      // const loadMore = (id) => {
      //   $store.dispatch("getAppBuilderData", id);
      // };

      let views = [
        { key: "list", dcID: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506" },
      ];
      function viewHTML() {
        let allResults = [];

        // let views = Page.views();
        // views.forEach((v) => {
        // allResults.push(v.html(...));
        // })
        views.forEach((view) => {
          switch (view.key) {
            case "list":
              let list = new List(view.dcID, allDCs, $f7, $store);
              allResults.push(list.html());
              break;
            default:
            // code block
          }
        });

        return allResults.map((r) => r()); // render each jsx template
      }

      return () => $h`
        <div class="page">
          <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner">
              <div class="left">
                <a href="#" data-panel=".panel-left" class="link icon-only panel-open">
                  <i class="icon material-icons">menu</i>
                </a>
              </div>
              <div class="title">${title}</div>
              <div class="title-large">
                <div class="title-large-text">${title}</div>
              </div>
            </div>
          </div>
          ${viewHTML()}
        </div>
      `;
    },
  },
  {
    path: "/edit",
    component: (props, { $, $h, $f7, $on, $store, $update }) => {
      const title = "Edit Person";
      const person = props.data;
      const allDCs = {};
      let isLoading = false;

      // for each DC on this Page, do:
      let dcIDs = ["19e566e3-a6b0-4ed5-83ea-a42b1ddbf5c5"];
      dcIDs.forEach((dcID) => {
        allDCs[dcID] = $store.getters[dcID];
      });

      $on("pageInit", (e, page) => {
        $store.dispatch(
          "getAppBuilderData",
          "19e566e3-a6b0-4ed5-83ea-a42b1ddbf5c5"
        );
        //convert boolean for toggle UI
        person.Toggle = person.Toggle ? "on" : "off";
        //convert date for date UI
        if (person.Birthday) {
          var MyDate = new Date(person.Birthday);
          var MyDateString =
            MyDate.getFullYear() +
            "-" +
            ("0" + (MyDate.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + MyDate.getDate()).slice(-2);
          person.Birthday = MyDateString;
        }
        //fill in form
        $f7.form.fillFromData("#my-form", person);

        // listen for when we remove the preloader on the smart select then set the value to the select
        // this is just a hack to get the value of the smart select set we may be able to take this out
        if ($(".smartSelectCountry .item-after .preloader").length) {
          $(".smartSelectCountry .item-after .preloader")[0].addEventListener(
            "DOMNodeRemoved",
            () => {
              $(
                "select[name='Country'] option[value='" + person.Country + "']"
              ).prop("selected", "selected");
            }
          );
        }
      });

      const save = (form) => {
        isLoading = true;
        $update();
        var formData = $f7.form.convertToData(form);
        //convert toggle back to boolean
        formData.Toggle = formData.Toggle.length ? 1 : 0;
        //convert date to JS Date().toString()
        formData.Birthday = new Date(formData.Birthday).toISOString();
        console.log(formData);
        // alert(JSON.stringify(formData));

        $store.dispatch("updateRecord", {
          dcID: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
          recordID: person.uuid,
          record: formData,
        });
        setTimeout(function () {
          isLoading = false;
          $update();
        }, 1000);
      };

      return () => $h`
        <div class="page" data-name="form">
          <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner sliding">
              <div class="left">
                <a href="#" class="link back">
                  <i class="icon icon-back"></i>
                  <span class="if-not-md">Back</span>
                </a>
              </div>
              <div class="title">${title}</div>
            </div>
          </div>
          <div class="page-content">
            <form class="list list-inset list-strong-ios list-dividers-ios list-outline-ios" id="my-form">
              <ul>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Name</div>
                      <div class="item-input-wrap">
                        <input name="Name" type="text" placeholder="Your name" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">E-mail</div>
                      <div class="item-input-wrap">
                        <input name="Email" type="email" placeholder="E-mail" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">URL</div>
                      <div class="item-input-wrap">
                        <input name="URL" type="url" placeholder="URL" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Phone</div>
                      <div class="item-input-wrap">
                        <input name="Phone" type="tel" placeholder="Phone" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Gender</div>
                      <div class="item-input-wrap">
                        <select name="Gender">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Birthday</div>
                      <div class="item-input-wrap">
                        <input name="Birthday" type="date" placeholder="Birthday" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <a class="item-link smartSelectCountry smart-select ${
                    allDCs["19e566e3-a6b0-4ed5-83ea-a42b1ddbf5c5"].value.records
                      .length
                      ? $h` `
                      : $h`disabled`
                  }">
                    <select name="Country">
                      ${allDCs[
                        "19e566e3-a6b0-4ed5-83ea-a42b1ddbf5c5"
                      ].value.records.map(
                        (item) => $h`
                        <option value="${item.uuid}">${item.Name}</option>
                      `
                      )}
                    </select>
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title">Country</div>
                        <div class="item-after">
                          ${
                            allDCs["19e566e3-a6b0-4ed5-83ea-a42b1ddbf5c5"].value
                              .records.length
                              ? $h`
                                ${
                                  allDCs[
                                    "19e566e3-a6b0-4ed5-83ea-a42b1ddbf5c5"
                                  ].value.records.filter(
                                    (item) => item.uuid == person.Country
                                  )[0].Name
                                }
                            `
                              : $h`
                                <div class="preloader"></div>
                              `
                          }
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-title">Toggle</div>
                      <div class="item-after">
                        <label class="toggle toggle-init">
                          <input name="Toggle" type="checkbox" />
                          <span class="toggle-icon"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Slider</div>
                      <div class="item-input-wrap">
                        <div class="range-slider range-slider-init" data-label="true">
                          <input name="Slider" type="range" value="50" min="0" max="100" step="1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="align-top">
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Resizable</div>
                      <div class="item-input-wrap">
                        <textarea name="Bio" placeholder="Bio" class="resizable"></textarea>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
            <div class="block">
              <a @click=${() =>
                save(
                  "#my-form"
                )} class="button button-large button-fill button-preloader ${
        isLoading ? "button-loading" : ""
      }" href="#">
                  <span class="preloader"></span>
                  <span>Save</span>
              </a>
            </div>
          </div>
        </div>
      `;
    },
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
