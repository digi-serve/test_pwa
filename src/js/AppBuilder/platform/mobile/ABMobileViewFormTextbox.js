/**
 * ABMobileViewFormTextbox
 * The view that displays a form textbox on the screen.
 */

import ABMobileViewFormTextboxCore from "../../core/mobile/ABMobileViewFormTextboxCore.js";

export default class ABMobileViewFormTextbox extends ABMobileViewFormTextboxCore {
   // constructor(...params) {
   //    super(...params);
   // }

   async init() {}

   inputElement($h) {
      let $inputElement = "";
      let field = this.field();
      let placeholder = this.settings.placeholder ?? "?placeholder?";

      switch (this.settings.type) {
         case "multiple":
            $inputElement = $h`
               <textarea
                  name=${field.columnName}
                  placeholder=${placeholder}
                  class="resizable"
                  ${this.settings.required ? "required" : ""}
                  ${this.settings.required ? "validate" : ""}
               ></textarea>
            `;
            break;

         // case "email":
         //    $inputElement =
         //       definition.settings.required === 1 ? (
         //          <input
         //             type="email"
         //             name={definition.field}
         //             placeholder={definition.placeholder}
         //             required
         //             validate
         //          ></input>
         //       ) : (
         //          <input
         //             type="email"
         //             name={definition.field}
         //             placeholder={definition.placeholder}
         //             required
         //             validate
         //          ></input>
         //       );

         //    break;

         default:
            // "single"
            // "rich"
            $inputElement = $h`
               <input
                  name=${field.columnName}
                  placeholder=${placeholder}
                  type="text"
                  ${this.settings.required ? "required" : ""}
                  ${this.settings.required ? "validate" : ""}
               />
            `;
            break;
      }

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
