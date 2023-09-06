import List from "../js/views/list.f7.jsx";

export default (AB) => {
   const L = AB.Label();

   return (props, { $, $h, $f7, $on, $store, $update }) => {
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
      const dcGetter = $store.getters["0e9f5f6f-cd0b-4b93-b0c8-d51bd9852322"];
      const allViews = [];

      $on("pageInit", async (e, page) => {
         const pendingInit = [];

         allViews.forEach((view) => {
            const dc = view.datacollection;

            dc?.init();

            const viewInit = async (view, callback) => {
               await view.init();

               callback();
            };
            const init = () =>
               new Promise((resolve) => {
                  if (dc && !dc.isDataInitialized) {
                     $store.dispatch("getAppBuilderData", dc.id);

                     const waitDCInit = setInterval(async () => {
                        if (dc.isDataInitialized) {
                           clearInterval(waitDCInit);

                           await viewInit(view, resolve);
                        }
                     }, 1000);

                     return;
                  }

                  viewInit(view, resolve);
               });

            pendingInit.push(init());
         });

         await Promise.all(pendingInit);

         $(".deleted-callback").on("swipeout:deleted", async function (value) {
            await delItem(this.getAttribute("id"));
         });
      });

      let views = [
         {
            id: "my-list",
            key: "list",
            dcID: "0e9f5f6f-cd0b-4b93-b0c8-d51bd9852322",
            detailPage: "ABPage.id",
         },
      ];
      function viewHTML() {
         const allResults = [];

         // allViews.forEach((v) => {
         //    allResults.push(v.html(...));
         // })

         views.forEach((view) => {
            switch (view.key) {
               case "list":
                  var list = new List(AB, view);
                  allResults.push(list.html());
                  allViews.push(list);
                  break;
               default:
               // code block
            }
         });

         return allResults.map((r) => r()); // render each jsx template
      }

      async function delItem(id) {
         let dc = allViews[0].datacollection;
         let item = id ? dc.$dc.getItem(id) : dc.getCursor();
         if (!item) {
            item = dc.getFirstRecord();
         }

         console.log("record to delete:", item);
         try {
            await dc.datasource
               .model()
               .delete(item[dc.datasource.PK()] || item.id || item.uuid);
         } catch (e) {
            console.error(e);
         }
      }

      //
      return () => (
         <div class="page">
            <div class="navbar">
               <div class="navbar-bg"></div>
               <div class="navbar-inner">
                  <div class="left">
                     <a
                        href="#"
                        data-panel=".panel-left"
                        class="link icon-only panel-open"
                     >
                        <i class="icon material-icons">menu</i>
                     </a>
                  </div>
                  <div class="title">{title}</div>
                  <div class="title-large">
                     <div class="title-large-text">{title}</div>
                  </div>
                  <div class="right">
                     <a
                        class="link icon-only"
                        href="#"
                        onclick={() => {
                           AB.$f7.view.main.router.navigate("/form", {
                              props: {
                                 data: {},
                              },
                              ignoreCache: true,
                           });
                        }}
                     >
                        <i class="icon f7-icons if-not-md">plus</i>
                        <i class="icon material-icons md-only">add</i>
                     </a>
                  </div>
               </div>
            </div>
            {viewHTML()}
         </div>
      );
   };
};
