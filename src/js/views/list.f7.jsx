//

export default class F7ViewList {
   constructor(settings, application, AB) {
      this.dcID = settings.dcID;
      this.settings = settings;

      this.application = application;

      // this.allDCs = allDCs;
      this.AB = AB;
      this.$f7 = AB.$f7;
      this.$store = AB.$store;

      setInterval(() => {
         console.log("... list data:", this.$store.getters[this.dcID].value);
      }, 1000);
   }

   get datacollection() {
      return this.AB.datacollectionByID(this.dcID);
   }

   itemSelected(item) {
      // if there is a detailPage set, then transition there:
      if (this.settings.detailPage) {
         // let DetailPage = this.application.pageByID(this.settings.detailPage)
         // DetailPage.openView(item);

         this.$f7.view.main.router.navigate("/edit", {
            props: {
               data: data,
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
      this.$f7.view.main.router.navigate("/list", {
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
      console.log(
         "... list data: .html(): ",
         this.$store.getters[this.dcID].value
      );
      if (this.$store.getters[this.dcID].value.length > 0) {
         return () => (
            <div
               class="page-content infinite-scroll-content"
               onInfinite={() => this.loadMore()}
            >
               <div class="list links-list list-outline list-strong list-dividers">
                  <ul>
                     {this.$store.getters[this.dcID].value.map((item) => (
                        <li key={item.uuid}>
                           <a href="#" onClick={() => this.itemSelected(item)}>
                              {item.Name}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>
               {this.hasMore()}
            </div>
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
