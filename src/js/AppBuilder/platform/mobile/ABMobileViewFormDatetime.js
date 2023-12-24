/**
 * ABMobileViewFormDatetime
 * The view that displays a form textbox on the screen.
 */

import ABMobileViewFormDatetimeCore from "../../core/mobile/ABMobileViewFormDatetimeCore.js";

export default class ABMobileViewFormDatetime extends ABMobileViewFormDatetimeCore {
   // constructor(...params) {
   //    super(...params);
   // }

   async init() {
      this.formDatepicker = this.AB.$f7.calendar.create({
         inputEl: `#${this.idFormElement}`, // ".form-datepicker-datetime",
         timePicker: true,
         dateFormat: {
            month: "numeric",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
         },
      });
   }

   destroy() {
      this.formDatepicker?.destroy();
   }

   valueLoad() {
      console.error("TODO: finish this");
   }

   inputElement($h) {
      let field = this.field();
      let placeholder = this.settings.placeholder ?? "";
      let $inputElement = $h`
         <input
            type="text"
            id=${this.idFormElement}
            name=${field.columnName}
            class="form-datepicker-datetime"
            placeholder=${placeholder}
            readonly="readonly"
         />
      `;

      this.updateProperties($inputElement);

      return $inputElement;
   }
}
