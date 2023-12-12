/**
 * ABMobileViewFormTextbox
 * The view that displays a form textbox on the screen.
 */

import ABMobileViewFormNumberCore from "../../core/mobile/ABMobileViewFormNumberCore.js";

export default class ABMobileViewFormNumber extends ABMobileViewFormNumberCore {
   // constructor(...params) {
   //    super(...params);
   // }

   // async init() {
   //    this.formDatepicker = this.AB.$f7.calendar.create({
   //       inputEl: `#${this.id}`, // ".form-datepicker-date",
   //    });
   // }

   // destroy() {
   //    this.formDatepicker?.destroy();
   // }

   inputElement($h) {
      let field = this.field();
      let placeholder = this.settings.placeholder ?? "";
      const errorMessage = this.AB.Label()("Only numbers please.");

      let $inputElement = $h`
               <input
                  type="number"
                  id=${this.id}
                  name=${field.columnName}
                  placeholder=${placeholder}
                  pattern="[0-9]*"
                  data-error-message=${errorMessage}
               />
            `;

      this.updateProperties($inputElement);

      return $inputElement;
   }
}
