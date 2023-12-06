/**
 * ABMobileViewFormTextbox
 * The view that displays a form textbox on the screen.
 */

import ABMobileViewFormDateCore from "../../core/mobile/ABMobileViewFormDateCore.js";

export default class ABMobileViewFormDate extends ABMobileViewFormDateCore {
   // constructor(...params) {
   //    super(...params);
   // }

   async init() {
      this.formDatepicker = this.AB.$f7.calendar.create({
         inputEl: `#${this.id}`, // ".form-datepicker-date",
      });
   }

   destroy() {
      this.formDatepicker?.destroy();
   }

   inputElement($h) {
      let field = this.field();
      let placeholder = this.settings.placeholder ?? "";

      let $inputElement = $h`
               <input
                  type="text"
                  id=${this.id}
                  name=${field.columnName}
                  class="form-datepicker-date"
                  placeholder=${placeholder}
                  readonly="readonly"
               />
            `;

      this.updateProperties($inputElement);

      return $inputElement;
   }

   html($h) {
      return $h`
         <div class="item-content item-input">
            <div class="item-inner">
               <div class="item-title item-label">${this.label}</div>
               <div class="item-input-wrap">${this.inputElement($h)}</div>
            </div>
         </div>`;
   }
}
