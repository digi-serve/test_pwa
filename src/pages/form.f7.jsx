import Form from "../js/views/form.f7.jsx";

export default (AB) => {
   const L = AB.Label();

   return (props, { $, $h, $f7, $on, $store, $update }) => {
      const title = props.isEditMode ? L("Edit Person") : L("Add Person");

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

      const views = [
         {
            id: "my-form",
            key: "form",
            dcID: "0e9f5f6f-cd0b-4b93-b0c8-d51bd9852322",
         },
      ];

      // for each view on this Page, do:
      const allViews = [];

      // let views = Page.views();
      // views.forEach((v) => {
      // allViews.push(v.html(...));
      // })
      views.forEach((view) => {
         switch (view.key) {
            case "form": {
               let form = new Form(AB, view);
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

      let formDatepickerDate = null;
      let formDatepickerDatetime = null;

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

         formDatepickerDate = $f7.calendar.create({
            inputEl: ".form-datepicker-date",
         });
         formDatepickerDatetime = $f7.calendar.create({
            inputEl: ".form-datepicker-datetime",
            timePicker: true,
            dateFormat: {
               month: "numeric",
               day: "numeric",
               year: "numeric",
               hour: "numeric",
               minute: "numeric",
            },
         });
      });

      $on("pageBeforeRemove", () => {
         formDatepickerDate.destroy();
         formDatepickerDatetime.destroy();
      });

      function viewHTML() {
         const allHTML = [];

         allViews.forEach((view) => {
            allHTML.push(view.html());
         });

         return allHTML.map((r) => r()); // render each jsx template
      }

      return () => (
         <div class="page" data-name="form">
            <div class="navbar">
               <div class="navbar-bg"></div>
               <div class="navbar-inner sliding">
                  <div class="left">
                     <a href="#" class="link back">
                        <i class="icon icon-back"></i>
                        <span class="if-not-md">{L("Back")}</span>
                     </a>
                  </div>
                  <div class="title">{title}</div>
               </div>
            </div>
            <div class="page-content">{viewHTML()}</div>
         </div>
      );
   };
};
