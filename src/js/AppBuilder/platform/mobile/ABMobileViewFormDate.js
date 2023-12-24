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
         inputEl: `#${this.idFormElement}`, // ".form-datepicker-date",
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
                  id=${this.idFormElement}
                  name=${field.columnName}
                  class="form-datepicker-date"
                  placeholder=${placeholder}
                  readonly="readonly"
               />
            `;

      this.updateProperties($inputElement);

      return $inputElement;
   }
}
