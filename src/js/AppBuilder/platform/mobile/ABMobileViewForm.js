/**
 * ABMobileViewForm
 * The view that displays a form on the screen.
 */

import ABMobileViewFormCore from "../../core/mobile/ABMobileViewFormCore.js";

export default class ABMobileViewForm extends ABMobileViewFormCore {
   // constructor(...params) {
   //    super(...params);
   // }

   async init() {}

   formItems($h) {
      return "Form Items here!";
   }

   html($h) {
      // // return () =>
      // //    $h`<div class="${this.style} ${this.alignment}">${this.text}</div>`;

      // let dc = this.datacollection;

      // if (!dc || this.AB.$store.getters[dc.id].value.length === 0)
      //    return () => $h`
      //          ${this.listTitle($h)}
      //          <div class="list links-list list-outline list-strong list-dividers skeleton-text skeleton-effect-fade">
      //             <ul>
      //                ${[...Array(20)].map(
      //                   (/* x, i */) => $h`
      //                   <li>
      //                      <a href="#">Skeleton text will go here</a>
      //                   </li>`
      //                )}
      //             </ul>
      //          </div>

      //    `;

      // return () => $h`
      //    ${this.listTitle($h)}
      //    ${this.searchBar($h)}
      //    <div
      //       class="infinite-scroll-content"
      //       onInfinite=${() => this.loadMore()}
      //    >
      //       <div class="list links-list list-outline list-strong list-dividers">
      //          <ul>${this.listItems($h)}</ul>
      //       </div>
      //       ${this.hasMore($h)}
      //    </div>`;

      return () => $h`
         <form
            class="list list-inset list-strong-ios list-dividers-ios list-outline-ios"
            id=${this.id}
         >
            ${this.formItems($h)}
         </form>`;
   }
}
