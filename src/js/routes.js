import NotFoundPage from "../pages/404.f7";

var routes = [
  {
    path: "/",
    component: (props, { $h, $f7, $on, $store }) => {
      const title = "List of People";
      const coolPeople = $store.getters["faa9905e-dea8-4c7f-8eb4-98f1e6e66506"];

      $on("pageInit", (e, page) => {
        // do something on page init
        $store.dispatch(
          "getAppBuilderData",
          "faa9905e-dea8-4c7f-8eb4-98f1e6e66506"
        );
      });

      const openView = (page, data) => {
        $f7.view.main.router.navigate(page, {
          props: {
            data: data,
          },
          ignoreCache: true,
        });
      };

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
          <div class="page-content">
            ${
              coolPeople.value.length == 0
                ? $h`
            <div style="display: block; font-size: 180px; background-color: #666; color: transparent; text-shadow: 0px 1px 1px rgba(255,255,255,0.5); -webkit-background-clip: text; -moz-background-clip: text; background-clip: text; margin: 20vh auto 20px;" class="icon material-icons">add_photo_alternate</div>
            <div class="block no-margin-top text-align-center">
              <p style="color: gray;">
                <small>Tap the <i class="icon f7-icons if-not-md">plus</i><i class="icon material-icons md-only">add</i> below to add an activity photo.</small>
              </p>
            </div>
              `
                : $h`
                <div class="list links-list list-outline-ios list-strong-ios list-dividers-ios">
                  <ul>
                    ${coolPeople.value.map(
                      (coolPerson) => $h`
                      <li key=${coolPerson.id} data-activity-image-id="${
                        coolPerson.id
                      }">
                        <a href="#" @click=${() =>
                          openView("/edit", coolPerson)}>
                          ${coolPerson["Name"]}
                        </a>
                      </li>
                    `
                    )}
                  </ul>
                </div>
              `
            }
          </div>
        </div>
      `;
    },
  },
  {
    path: "/edit",
    component: (props, { $h, $f7, $on, $store }) => {
      const title = "Edit Person";
      const person = props.data;

      $on("pageInit", (e, page) => {
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
      });

      const save = (form) => {
        var formData = $f7.form.convertToData(form);
        //convert toggle back to boolean
        formData.Toggle = formData.Toggle.length ? 1 : 0;
        //convert date to JS Date().toString()
        formData.Birthday = new Date(formData.Birthday).toISOString();
        console.log(formData);
        alert(JSON.stringify(formData));
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
            <form class="list list-strong-ios list-dividers-ios list-outline-ios" id="my-form">
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
                  "#my-form",
                  "idofobject"
                )} class="button button-large button-fill convert-form-to-data" href="#">Get Data</a>
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
