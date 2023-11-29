/**
 * ABMobileViewList
 * The view that displays a list on the screen.
 */

import ABMobileViewListCore from "../../core/mobile/ABMobileViewListCore.js";

export default class ABMobileViewList extends ABMobileViewListCore {
   // constructor(...params) {
   //    super(...params);
   // }

   async init() {}

   itemSelected(item) {
      // Make sure our DC registers which item was just selected.
      const dc = this.datacollection;

      if (dc) {
         dc.setCursor(item[dc.datasource.PK()] || item.id || item.uuid);
      }

      // if there is a detailPage set, then transition there:
      if (this.settings.linkPageDetail) {
         const DetailPage = this.application.pageByID(
            this.settings.linkPageDetail
         );

         DetailPage.show(true);
         // .show(showBack = true)
      }
   }

   openAddPage() {
      if (this.settings.linkPageAdd) {
         const addPage = this.application.pageByID(this.settings.linkPageAdd);
         if (addPage) {
            addPage.show(true);
            // .show(true) => show back button
         }
      }
   }

   loadMore() {
      // if (this.$store.getters[this.#settings.dcID].value.hasMore) {
      let dc = this.datacollection;
      if (dc && dc.hasMore()) {
         this.AB.$store.dispatch("getAppBuilderData", dc.id);
      }
   }

   hasMore($h) {
      if (this.datacollection.hasMore()) {
         return $h`<div class="preloader infinite-scroll-preloader"></div>`;
      }
   }

   template(item) {
      let field = this.field();
      if (field) {
         return field.format(item);
      }
      return "";
   }

   listItems($h) {
      const L = this.AB.Label();

      return this.AB.$store.getters[this.datacollection.id].value.map(
         (item) => $h`
         <li id=${item.uuid} class="swipeout deleted-callback">
            <div
               class="swipeout-content item-content"
               onClick=${() => this.itemSelected(item)}
            >
               <div class="item-inner">
                  <div class="item-title">${this.template(item)}</div>
               </div>
            </div>
            <div class="swipeout-actions-right">
               <a
                  href="#"
                  class="swipeout-delete"
                  data-confirm=${L("Are you sure want to delete this item?")}
                  data-confirm-title=${L("Delete?")}
               >
                  ${L("Delete")}
               </a>
            </div>
         </li>`
      );
   }

   addButton($h) {
      if (!this.settings.linkPageAdd) return "";

      return $h`
<div class="float-right">
   <a 
       href="#" 
       class="link icon-only"
       onclick=${() => {
          this.openAddPage();
       }}
   >
   <i class="icon f7-icons if-not-md">plus</i>
   <i class="icon material-icons md-only">add</i>
   </a>
</div>`;
   }

   listTitle($h) {
      // hide Title bar if nothing to display:
      if (this.settings.hideTitle && !this.settings.linkPageAdd) {
         return "";
      }

      return $h`
<div class="block-title block-title-medium no-margin-after">
  ${!this.settings.hideTitle ? this.label : ""}
  ${this.addButton($h)}
</div>
      `;
   }

   /**
    * @method searchBar()
    * return the DOM for adding a searchbar
    * @param {$h} $h
    *        Framework7 Template tool
    * @return $h Template
    */
   searchBar($h) {
      return "";

      // @TODO:
      // - create a SearchFilterSort Bar Widget
      // - check if this.settings.includeSearchBar is set
      // - return the this.SearchFilterSort.html($h)

      // Questions:
      // does the SearchFilterSortBar update the data in the DC
      // directly?  This seems how F7 will update the display.
      // But it will effect anything that uses the same DC.
   }

   html($h) {
      // return () =>
      //    $h`<div class="${this.style} ${this.alignment}">${this.text}</div>`;

      let dc = this.datacollection;

      if (!dc || this.AB.$store.getters[dc.id].value.length === 0)
         return () => $h`
               ${this.listTitle($h)}
               <div class="list links-list list-outline list-strong list-dividers skeleton-text skeleton-effect-fade">
                  <ul>
                     ${[...Array(20)].map(
                        (/* x, i */) => $h`
                        <li>
                           <a href="#">Skeleton text will go here</a>
                        </li>`
                     )}
                  </ul>
               </div>
           
         `;

      return () => $h`
         ${this.listTitle($h)}
         ${this.searchBar($h)}
         <div
            class="infinite-scroll-content"
            onInfinite=${() => this.loadMore()}
         >
            <div class="list links-list list-outline list-strong list-dividers">
               <ul>${this.listItems($h)}</ul>
            </div>
            ${this.hasMore($h)}
         </div>`;
   }
}
