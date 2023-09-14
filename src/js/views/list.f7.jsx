export default class F7ViewList {
   #AB;
   #settings;
   constructor(AB, settings) {
      this.#AB = AB;
      this.#settings = settings;
   }

   get id() {
      return this.#settings.id;
   }

   get datacollection() {
      return this.#AB.datacollectionByID(this.#settings.dcID);
   }

   async init() {}

   itemSelected(item) {
      // if there is a detailPage set, then transition there:
      if (this.#settings.detailPage) {
         this.#AB.$f7.view.main.router.navigate(this.#settings.detailPage, {
            props: {
               isEditMode: true,
            },
            ignoreCache: true,
         });
      }

      // Make sure our DC registers which item was just selected.
      const dc = this.datacollection;

      if (dc) {
         dc.setCursor(item[dc.datasource.PK()] || item.id || item.uuid);
      }
   }

   // NOTE: this now means OPEN THIS VIEW.
   openView(data) {
      this.#AB.$f7.view.main.router.navigate(this.settings.route, {
         props: {
            data: data,
         },
         ignoreCache: true,
      });
   }

   loadMore() {
      // if (this.$store.getters[this.#settings.dcID].value.hasMore) {
      if (this.datacollection.hasMore()) {
         this.#AB.$store.dispatch("getAppBuilderData", this.#settings.dcID);
      }
   }

   hasMore() {
      if (this.datacollection.hasMore()) {
         return <div class="preloader infinite-scroll-preloader"></div>;
      }
   }

   viewHTML() {
      return this.#AB.$store.getters[this.#settings.dcID].value.map((item) => (
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
      ));
   }

   html() {
      if (this.#AB.$store.getters[this.#settings.dcID].value.length === 0)
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

      return () => (
         <div
            class="page-content infinite-scroll-content"
            onInfinite={() => this.loadMore()}
         >
            <div class="list links-list list-outline list-strong list-dividers">
               <ul>{this.viewHTML()}</ul>
            </div>
            {this.hasMore()}
         </div>
      );
   }
}
