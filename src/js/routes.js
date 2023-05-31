import NotFoundPage from "../pages/404.f7";
import List from "./views/list.f7.jsx";
import Form from "./views/form.f7.jsx";

import AB from "./AppBuilder/ABFactory.js";

var routes = [
   {
      path: "/",
      component: (props, { $h, $f7, $on, $store, $update }) => {
         const title = "List of People";
         let allDCs = {};

         // let pageID = "ABPage.id";
         // let Page = AB.pageByID(pageID);

         AB.datacollections().forEach((dc) => {
            allDCs[dc.id] = $store.getters[dc.id];
         });

         // for each DC on this Page, do:
         // let dcIDs = ["0e9f5f6f-cd0b-4b93-b0c8-d51bd9852322"];
         // dcIDs.forEach((dcID) => {
         //   allDCs[dcID] = $store.getters[dcID];
         // });

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
               "0e9f5f6f-cd0b-4b93-b0c8-d51bd9852322"
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
            { key: "list", dcID: "0e9f5f6f-cd0b-4b93-b0c8-d51bd9852322" },
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

         // for each DC on this Page, do:
         let dcIDs = ["19e566e3-a6b0-4ed5-83ea-a42b1ddbf5c5"];
         dcIDs.forEach((dcID) => {
            allDCs[dcID] = $store.getters[dcID];
         });

         let views = [
            { key: "form", dcID: "0e9f5f6f-cd0b-4b93-b0c8-d51bd9852322" },
         ];

         // for each view on this Page, do:
         let allViews = [];

         // let views = Page.views();
         // views.forEach((v) => {
         // allViews.push(v.html(...));
         // })
         views.forEach((view) => {
            switch (view.key) {
               case "form":
                  let form = new Form(view.dcID, allDCs, $f7, $store, person);
                  allViews.push(form);
                  break;
               default:
               // code block
            }
         });

         $on("pageInit", (e, page) => {
            $store.dispatch(
               "getAppBuilderData",
               "19e566e3-a6b0-4ed5-83ea-a42b1ddbf5c5"
            );
            // init all the views
            return allViews.map((r) => r.init());
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
                  <span class="if-not-md">Back</span>
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
];

export default routes;
