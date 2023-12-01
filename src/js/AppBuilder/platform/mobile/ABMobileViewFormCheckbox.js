import ABMobileViewFormCheckboxCore from "../../core/mobile/ABMobileViewFormCheckboxCore";

export default class ABMobileViewFormCheckbox extends ABMobileViewFormCheckboxCore {
   async init() {}

   inputElement($h) {
      let field = this.field();
      let $inputElement = $h`
         <input 
            name=${field.columnName} 
            type="checkbox" 
            ${this.settings.disable ? 'disabled="disabled"' : ""}
         />
      `;
      this.updateProperties($inputElement);

      return $inputElement;
   }

   html($h) {
      return $h`
         <div class="item-content">
            <div class="item-inner">
               <div class="item-title">${this.label}</div>
               <div class="item-after">
                  <label class="toggle toggle-init">
                     ${this.inputElement($h)}
                     <i class="toggle-icon"></i>
                  </label>
               </div>
            </div>
         </div>
         `;
   }
}
