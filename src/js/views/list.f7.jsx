export default class F7ViewList {
   constructor(dcID, allDCs, $f7, $store) {
      this.dcID = dcID;
      this.allDCs = allDCs;
      this.$f7 = $f7;
      this.$store = $store;
   }

   openView(page, data) {
      this.$f7.view.main.router.navigate(page, {
         props: {
            data: data,
         },
         ignoreCache: true,
      });
   }

   loadMore() {
      this.$store.dispatch("getAppBuilderData", this.dcID);
   }

   hasMore() {
      if (this.allDCs[this.dcID].value.hasMore) {
         return <div class="preloader infinite-scroll-preloader"></div>;
      }
   }

   html() {
      if (this.allDCs[this.dcID].value.records.length > 0) {
         return () => (
            <div
               class="page-content infinite-scroll-content"
               onInfinite={() => this.loadMore()}
            >
               <div class="list links-list list-outline list-strong list-dividers">
                  <ul>
                     {this.allDCs[this.dcID].value.records.map((item) => (
                        <li key={item.uuid}>
                           <a
                              href="#"
                              onClick={() => this.openView("/edit", item)}
                           >
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
