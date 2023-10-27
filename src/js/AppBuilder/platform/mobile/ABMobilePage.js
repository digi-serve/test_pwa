import ABMobilePageCore from "../../core/mobile/ABMobilePageCore";

export default class ABMobilePage extends ABMobilePageCore {
   // constructor(values, application, parent, defaultValues) {
   //    super(values, application, parent, defaultValues);
   // }
   // warningsEval() {
   //    super.warningsEval();
   //    let allViews = this.views();
   //    if (allViews.length == 0) {
   //       this.warningsMessage("has no sub views");
   //    }
   //    (this.pages() || []).forEach((p) => {
   //       p.warningsEval();
   //    });
   // }

   routeComponent() {
      return {
         path: `/${this.route}`,
         component: (props, { $, $h, $f7, $on, $store, $update }) => {
            const title = this.label;
            let allGetters = {};

            // NOTE: Programming Quirk:
            // We seem to need to access our getters for this Page from
            // within this PageComponent definition.  (maybe) this is how
            // it registers the components that need to be redrawn when the
            // related state is updated.
            let allViews = this.views();
            allViews.forEach((v) => {
               let dc = v.datacollection;
               if (dc) {
                  dc.init();
                  allGetters[dc.id] = $store.getters[dc.id];
               }
            });

            $on("pageInit", async (e, page) => {
               const pendingInit = [];
               allViews.forEach((v) => {
                  let dc = v.datacollection;
                  // dc?.init();

                  const viewInit = async (v, callback) => {
                     await v.init();

                     callback();
                  };
                  const init = () =>
                     new Promise((resolve) => {
                        if (dc && !dc.isDataInitialized) {
                           $store.dispatch("getAppBuilderData", dc.id);

                           const waitDCInit = setInterval(async () => {
                              if (dc.isDataInitialized) {
                                 clearInterval(waitDCInit);

                                 await viewInit(v, resolve);
                              }
                           }, 500);

                           return;
                        }

                        viewInit(v, resolve);
                     });

                  pendingInit.push(init());
               });

               await Promise.all(pendingInit);

               // $("#add-data-form-submit").on("click", async () => {
               //    const formData = $f7.form.convertToData("#add-data-form");

               //    console.log(formData);
               //    // await addItem(formData)
               // });

               // $(".deleted-callback").on(
               //    "swipeout:deleted",
               //    async function (value) {
               //       await delItem(this.getAttribute("id"));
               //    }
               // );
            });

            // let views = [
            //    {
            //       key: "list",
            //       dcID: "0e9f5f6f-cd0b-4b93-b0c8-d51bd9852322",
            //       detailPage: "ABPage.id",
            //    },
            // ];
            function viewHTML() {
               let allResults = [];

               allViews.forEach((v) => {
                  allResults.push(v.html($h));
               });

               // views.forEach((view) => {
               //    switch (view.key) {
               //       case "list":
               //          var list = new List(view, { Application }, AB);
               //          allResults.push(list.html());
               //          allViews.push(list);
               //          break;
               //       default:
               //       // code block
               //    }
               // });

               return allResults.map((r) => r()); // render each jsx template
            }

            // async function addItem() {
            //    let DC = allViews[0].datacollection;
            //    let firstItem = DC.getFirstRecord();
            //    console.log(firstItem);
            //    let removeThese = ["uuid", "created_at", "updated_at", "id"];
            //    let newItem = {};
            //    Object.keys(firstItem).forEach((k) => {
            //       if (removeThese.indexOf(k) == -1) {
            //          newItem[k] = firstItem[k];
            //       }
            //    });

            //    newItem.Name = `${newItem.Name}-${AB.jobID()}`;
            //    console.log(newItem);

            //    try {
            //       await DC.datasource.model().create(newItem);
            //    } catch (e) {
            //       console.error(e);
            //    }
            // }

            // async function delItem(id) {
            //    let DC = allViews[0].datacollection;
            //    let item = id ? DC.$dc.getItem(id) : DC.getCursor();
            //    if (!item) {
            //       item = DC.getFirstRecord();
            //    }

            //    console.log("record to delete:", item);
            //    try {
            //       await DC.datasource
            //          .model()
            //          .delete(item[DC.datasource.PK()] || item.id || item.uuid);
            //    } catch (e) {
            //       console.error(e);
            //    }
            // }

            //
            return () => $h`
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
                  <div class="title">${title}</div>
                  <div class="title-large">
                     <div class="title-large-text">${title}</div>
                  </div>
                  <div class="right">
                     <a
                        href="#"
                        data-panel=".panel-right"
                        class="link icon-only panel-open"
                     >
                        <i class="icon f7-icons if-not-md">plus</i>
                        <i class="icon material-icons md-only">add</i>
                     </a>
                  </div>
               </div>
            </div>
            <div class="page-content infinite-scroll-content">
            ${viewHTML()}
            </div>
         </div>
      `;
         },
      };
   }
}
