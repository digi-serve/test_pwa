//

export default class F7ViewList {
   constructor(settings, parent, AB) {
      this.dcID = settings.dcID;
      this.settings = settings;
      this.settings.route = "/list";

      this.parent = parent;
      this.Application = parent.Application;

      // this.allDCs = allDCs;
      this.AB = AB;
      this.$f7 = AB.$f7;
      this.$store = AB.$store;

      // setInterval(() => {
      //    console.log("... list data:", this.$store.getters[this.dcID].value);
      // }, 1000);
   }

   get datacollection() {
      return this.AB.datacollectionByID(this.dcID);
   }

   init() {
      return Promise.resolve();
   }

   itemSelected(item) {
      // if there is a detailPage set, then transition there:
      if (this.settings.detailPage) {
         // let DetailPage = this.application.pageByID(this.settings.detailPage)
         // DetailPage.openView(item);

         this.$f7.view.main.router.navigate("/edit", {
            props: {
               data: item,
            },
            ignoreCache: true,
         });
      }

      // Make sure our DC registers which item was just selected.
      var DC = this.datacollection;
      if (DC) {
         DC.setCursor(item[DC.datasource.PK()] || item.id || item.uuid);
      }
   }

   // NOTE: this now means OPEN THIS VIEW.
   openView(data) {
      this.$f7.view.main.router.navigate(this.settings.route, {
         props: {
            data: data,
         },
         ignoreCache: true,
      });
   }

   loadMore() {
      // if (this.$store.getters[this.dcID].value.hasMore) {
      if (this.datacollection.hasMore()) {
         this.$store.dispatch("getAppBuilderData", this.dcID);
      }
   }

   hasMore() {
      if (this.datacollection.hasMore()) {
         return <div class="preloader infinite-scroll-preloader"></div>;
      }
   }

   html() {
      window.onresize = () => {
         document.querySelector(
            ".panel.panel-right.panel-cover.light.panel-init"
         ).style.width = `${window.screen.width * 0.5}px`;
      };

      if (this.$store.getters[this.dcID].value.length > 0) {
         return () => (
            <>
               <div
                  class="panel panel-right panel-cover light panel-init"
                  style={`width: ${window.screen.width * 0.5}px;`}
               >
                  <div class="view">
                     <div class="page">
                        <div class="navbar">
                           <div class="navbar-bg"></div>
                           <div class="navbar-inner">
                              <div class="title">{"Add data"}</div>
                           </div>
                        </div>
                        <div class="page-content">
                           <form
                              class="list list-strong-ios list-dividers-ios list-outline-ios"
                              id="add-data-form"
                           >
                              <ul>
                                 {this.datacollection.datasource
                                    .fields()
                                    .map((field) => {
                                       switch (field.key) {
                                          case "string":
                                             return (
                                                <li>
                                                   <div class="item-content item-input">
                                                      <div class="item-inner">
                                                         <div class="item-title item-label">
                                                            {field.label}
                                                         </div>
                                                         <div class="item-input-wrap">
                                                            <input
                                                               type="text"
                                                               name={
                                                                  field.columnName
                                                               }
                                                               placeholder=""
                                                            />
                                                         </div>
                                                      </div>
                                                   </div>
                                                </li>
                                             );

                                          default:
                                             return (
                                                <li>
                                                   <div class="item-content item-input">
                                                      <div class="item-inner">
                                                         <div class="item-title item-label">
                                                            {field.label}
                                                         </div>
                                                         <div class="item-input-wrap">
                                                            <input
                                                               type="text"
                                                               name={
                                                                  field.columnName
                                                               }
                                                               placeholder=""
                                                            />
                                                         </div>
                                                      </div>
                                                   </div>
                                                </li>
                                             );
                                       }
                                    })}
                              </ul>
                           </form>
                           <div
                              class="grid grid-cols-2 grid-gap"
                              style="margin: 12px 0px;"
                           >
                              <div></div>
                              <div style="text-align: right;">
                                 <button
                                    id="add-data-form-submit"
                                    class="button button-fill"
                                    style="max-width: 200px;"
                                 >
                                    Submit
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div
                  class="page-content infinite-scroll-content"
                  onInfinite={() => this.loadMore()}
               >
                  <div class="list links-list list-outline list-strong list-dividers">
                     <ul>
                        {this.$store.getters[this.dcID].value.map((item) => (
                           <li id={item.uuid} class="swipeout deleted-callback">
                              <div
                                 class="swipeout-content item-content"
                                 onClick={() => this.itemSelected(item)}
                              >
                                 <div class="item-inner">
                                    <div class="item-title">{item.Name}</div>
                                 </div>
                              </div>
                              <div class="swipeout-actions-right">
                                 <a
                                    href="#"
                                    class="swipeout-delete"
                                    data-confirm="Are you sure want to delete this item?"
                                    data-confirm-title="Delete?"
                                 >
                                    Delete
                                 </a>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </div>
                  {this.hasMore()}
               </div>
            </>
         );
      } else {
         return () => (
            <div class="page-content infinite-scroll-content">
               <div class="list links-list list-outline list-strong list-dividers skeleton-text skeleton-effect-fade">
                  <ul>
                     {[...Array(20)].map((x, i) => (
                        <li>
                           <a href="#">Skeleton text will go here</a>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         );
      }
   }
}
