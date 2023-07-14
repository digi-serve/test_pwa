import NotFoundPage from "../pages/404.f7";
import List from "./views/list.f7.jsx";
import Form from "./views/form.f7.jsx";

import AB from "./AppBuilder/ABFactory.js";
const L = AB.Label();

const Application = AB.applicationByID("4b7a489a-5fe5-4044-8565-aaa3654300f2");

AB.isInitialized = false;
async function init() {
   if (!AB.isInitialized) {
      try {
         var user = await AB.Network.get({ url: "/mobile/whoami" });
         AB.isInitialized = true;
         AB.$f7.view.main.router.navigate("/list", {
            transition: "f7-fade",
         });
      } catch (e) {
         // NOTE: this will catch errors OTHER than the "Reauth" notification
         // errors.  Those will be caught by listening to the AB.Network object
         AB.$f7.loginScreen.open("#my-login-screen");
      }
   } else {
      console.warn("Why is page(/).onPageInit() still getting called?");
   }
}

AB.Network.on("reauth", () => {
   AB.isInitialized = false;
   AB.$f7.loginScreen.open("#my-login-screen");
});

var routes = [
   {
      path: "/",
      component: (props, { $, $h, $f7, $on, $store, $update }) => {
         AB.$ = $;
         AB.$f7 = $f7;
         AB.$store = $store;

         $on("pageInit", async (e, page) => {
            // var panel = $f7.panel.get(".panel-left");
            // panel.open();
            await init();
         });

         return () => $h`
            <div class="page">
               <div class="block no-margin text-align-center vertical-container">
                  <div class="preloader vertical-center"></div>
               </div>
            </div>
      `;
      },
   },
   {
      path: "/list",
      component: (props, { $, $h, $f7, $on, $store, $update }) => {
         const title = L("List of People");
         let allGetters = {};

         // // NOTE: Programming Quirk:
         // // We seem to need to access our getters for this Page from
         // // within this PageComponent definition.  (maybe) this is how
         // // it registers the components that need to be redrawn when the
         // // related state is updated.
         // let pageID = "ABPage.id";
         // let Page = AB.pageByID(pageID);
         // let allViews = Page.views();
         // allViews.forEach((v) => {
         //    let dc = v.datacollection;
         //    if (dc) {
         //       allGetters[dc.id] = $store.getters[dc.id];
         //    }
         // })
         let dcGetter = $store.getters["0e9f5f6f-cd0b-4b93-b0c8-d51bd9852322"];
         var allViews = [];

         $on("pageInit", (e, page) => {
            allViews.forEach((v) => {
               let dc = v.datacollection;
               dc?.init();
               if (dc && !dc.dataInitialized) {
                  $store.dispatch("getAppBuilderData", dc.id);
               }
               v.init();
            });

            // just temporary:
            $("#btnAdd").on("click", () => {
               delItem();
            });

            $("#btnDel").on("click", () => {
               delItem();
            });
         });

         let views = [
            {
               key: "list",
               dcID: "0e9f5f6f-cd0b-4b93-b0c8-d51bd9852322",
               detailPage: "ABPage.id",
            },
         ];
         function viewHTML() {
            let allResults = [];

            // allViews.forEach((v) => {
            //    allResults.push(v.html(...));
            // })

            views.forEach((view) => {
               switch (view.key) {
                  case "list":
                     var list = new List(view, { Application }, AB);
                     allResults.push(list.html());
                     allViews.push(list);
                     break;
                  default:
                  // code block
               }
            });

            return allResults.map((r) => r()); // render each jsx template
         }

         async function addItem() {
            let DC = allViews[0].datacollection;
            let firstItem = DC.getFirstRecord();
            console.log(firstItem);
            let removeThese = ["uuid", "created_at", "updated_at", "id"];
            let newItem = {};
            Object.keys(firstItem).forEach((k) => {
               if (removeThese.indexOf(k) == -1) {
                  newItem[k] = firstItem[k];
               }
            });

            newItem.Name = `${newItem.Name}-${AB.jobID()}`;
            console.log(newItem);

            try {
               await DC.datasource.model().create(newItem);
            } catch (e) {
               console.error(e);
            }
         }

         async function delItem() {
            let DC = allViews[0].datacollection;
            let item = DC.getCursor();
            if (!item) {
               item = DC.getFirstRecord();
            }

            console.log("record to delete:", item);
            try {
               await DC.datasource
                  .model()
                  .delete(item[DC.datasource.PK()] || item.id || item.uuid);
            } catch (e) {
               console.error(e);
            }
         }

         //
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
              <a id="btnAdd" class="button" >Add</a>
              <a id="btnDel" class="button" >Delete</a>
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
         const title = L("Edit Person");
         const record = props.data;

         // // NOTE: Programming Quirk:
         // // We seem to need to access our getters for this Page from
         // // within this PageComponent definition.  (maybe) this is how
         // // it registers the components that need to be redrawn when the
         // // related state is updated.
         // let pageID = "ABPage.id";
         // let Page = AB.pageByID(pageID);
         // let allViews = Page.views();
         // allViews.forEach((v) => {
         //    let dc = v.datacollection;
         //    if (dc) {
         //       allGetters[dc.id] = $store.getters[dc.id];
         //    }
         // })

         let dcGetter = $store.getters["0e9f5f6f-cd0b-4b93-b0c8-d51bd9852322"];

         let views = [
            {
               key: "form",
               dcID: "0e9f5f6f-cd0b-4b93-b0c8-d51bd9852322",
               formID: "my-form",
            },
         ];

         // for each view on this Page, do:
         let allViews = [];

         // let views = Page.views();
         // views.forEach((v) => {
         // allViews.push(v.html(...));
         // })
         views.forEach((view) => {
            switch (view.key) {
               case "form": {
                  let form = new Form(view, { Application }, AB);
                  /* new Form(
                     view.dcID,
                     allDCs,
                     $,
                     $f7,
                     $store,
                     person
                  ); */
                  allViews.push(form);
                  break;
               }
               default:
               // code block
            }
         });

         $on("pageInit", (e, page) => {
            allViews.forEach((v) => {
               let dc = v.datacollection;
               dc?.init();
               if (dc && !dc.dataInitialized) {
                  $store.dispatch("getAppBuilderData", dc.id);
               }
               v.init();
            });
         });

         function viewHTML() {
            let allHTML = [];
            allViews.forEach((view) => {
               allHTML.push(view.html());
            });
            return allHTML.map((r) => r()); // render each jsx template
         }

         return () => $h`
        <div class="page" data-name="form">
          <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner sliding">
              <div class="left">
                <a href="#" class="link back">
                  <i class="icon icon-back"></i>
                  <span class="if-not-md">${L("Back")}</span>
                </a>
              </div>
              <div class="title">${title}</div>
            </div>
          </div>
          <div class="page-content">
            ${viewHTML()}
          </div>
        </div>
      `;
      },
   },
   {
      path: "(.*)",
      component: NotFoundPage,
   },
   //    {
   //       path: "(.*)",
   //       component: (props, { $, $h, $f7, $on, $store, $update }) => {
   //          return () => $h`
   //        <template>
   // <div class="page">
   //   <div class="navbar">
   //     <div class="navbar-bg"></div>
   //     <div class="navbar-inner sliding">
   //       <div class="left">
   //         <a href="#" class="link back">
   //           <i class="icon icon-back"></i>
   //           <span class="if-not-md">Back</span>
   //         </a>
   //       </div>
   //       <div class="title">Not found</div>
   //     </div>
   //   </div>
   //   <div class="page-content">
   //     <div class="block block-strong inset">
   //       <center>
   //         <h1>Sorry</h1>
   //         <p>Requested content not found.</p>
   //       </center>
   //     </div>
   //   </div>
   // </div>
   // </template>
   // <script>
   // export default () => {
   //   return $render;
   // };
   // </script>
   //       `;
   //       },
   //    },
];

const listPages = Application.pages();
listPages.forEach((Page) => {
   routes.push(Page.routeComponent());
});

export default routes;
