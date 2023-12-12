/**
 * ABMobileViewFormSelectSingle
 * The view that displays a list that can only have 1 selection.
 */

import ABMobileViewFormSelectSingleCore from "../../core/mobile/ABMobileViewFormSelectSingleCore.js";

export default class ABMobileViewFormSelectSingle extends ABMobileViewFormSelectSingleCore {
   constructor(...params) {
      super(...params);

      this.options = [
         /* {id, text} */
         // { id: 1, text: "one" },
         // { id: 2, text: "two" },
         // { id: 3, text: "three" },
      ];

      let field = this.field();
      if (field) {
         field.options().forEach((opt) => {
            // opt = { id, text, hex, translations }
            this.options.push({ id: opt.id, text: opt.text });
         });
      }
      this.value = null;
   }

   // setOptions(values, k = "id", t = "text") {
   //    this.options = [];
   //    (values || []).forEach((v) => {
   //       this.options.push({ id: v[k], text: v[t] });
   //    });
   // }

   setValue(vid) {
      this.value = vid;
   }

   inputElement($h, item) {
      let $inputElement = $h`<option value=${item.id}>${item.text}</option>`;
      if (this.value == item.id) {
         $inputElement.props.selected = "";
      }
      return $inputElement;
   }

   html($h) {
      let field = this.field();
      return $h`
         <div class="item-content item-input">
            <div class="item-inner">
               <div class="item-title item-label">${field?.label}</div>
               <div class="item-input-wrap">
                  <select name=${field?.columnName}>
                     ${this.options.map((item) => this.inputElement($h, item))}
                  </select>
               </div>
            </div>
         </div>
         `;
   }
}
