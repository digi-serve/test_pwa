/**
 * ABMobileViewFormEmail
 * The view that displays a form textbox on the screen.
 */

import ABMobileViewFormEmailCore from "../../core/mobile/ABMobileViewFormEmailCore.js";

export default class ABMobileViewFormEmail extends ABMobileViewFormEmailCore {
   // constructor(...params) {
   //    super(...params);
   // }

   async init() {}

   inputElement($h) {
      let field = this.field();
      let placeholder = this.settings.placeholder ?? "";
      let $inputElement = $h`
         <input
            type="email"
            name=${field.columnName}
            placeholder=${placeholder}
         />
      `;

      this.updateProperties($inputElement);

      return $inputElement;
   }
}
