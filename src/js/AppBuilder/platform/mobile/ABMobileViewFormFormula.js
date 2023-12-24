/**
 * ABMobileViewFormFormula
 * The view that displays a form textbox on the screen.
 */

import ABMobileViewFormFormulaCore from "../../core/mobile/ABMobileViewFormFormulaCore.js";

export default class ABMobileViewFormFormula extends ABMobileViewFormFormulaCore {
   // constructor(...params) {
   //    super(...params);
   // }

   async init() {}

   // destroy() {

   // }

   inputElement($h) {
      let field = this.field();
      let placeholder = this.settings.placeholder ?? "";

      let $inputElement = $h`
               <input
                  type="text"
                  id=${this.idFormElement}
                  name=${field.columnName}
                  readonly="readonly"
                  disabled="disabled"
               />
            `;

      // this.updateProperties($inputElement);

      return $inputElement;
   }
}
