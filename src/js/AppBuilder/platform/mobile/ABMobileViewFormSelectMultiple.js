/**
 * ABMobileViewFormSelectMultiple
 * The view that displays a list that can only have 1 selection.
 */

import ABMobileViewFormSelectMultipleCore from "../../core/mobile/ABMobileViewFormSelectMultipleCore.js";

export default class ABMobileViewFormSelectMultiple extends ABMobileViewFormSelectMultipleCore {
   // constructor(...params) {
   //    super(...params);

   //    this.options = [
   //       /* {id, text} */
   //       // { id: 1, text: "one" },
   //       // { id: 2, text: "two" },
   //       // { id: 3, text: "three" },
   //    ];

   //    this.field.options().forEach((opt) => {
   //       // opt = { id, text, hex, translations }
   //       this.options.push({ id: opt.id, text: opt.text });
   //    });
   //    this.value = null;
   // }

   // setOptions(values, k = "id", t = "text") {
   //    this.options = [];
   //    (values || []).forEach((v) => {
   //       this.options.push({ id: v[k], text: v[t] });
   //    });
   // }

   // setValue(vid) {
   //    this.value = vid;
   // }

   // inputElement($h, item) {
   //    let $inputElement = $h`<option value=${item.id}>${item.text}</option>`;
   //    if (this.value == item.id) {
   //       $inputElement.props.selected = "";
   //    }
   //    return $inputElement;
   // }

   html($h) {
      let value = this.options.find((o) => o.id == this.value)?.text;
      let field = this.field();
      return $h`
         <a href="#" class="item-link smart-select smart-select-init">
            <select
               name=${field?.columnName}
               multiple
            >
               ${this.options.map((item) => this.inputElement($h, item))}
            </select>
            <div class="item-content">
               <div class="item-inner">
                  <div class="item-title">${field?.label}</div>
                  <div class="item-after">${value || "Value"}</div>
               </div>
            </div>
         </a>
         `;
   }
}
