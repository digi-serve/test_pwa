import ABMobileViewFormCheckboxCore from "../../core/mobile/ABMobileViewFormCheckboxCore";

export default class ABMobileViewFormCheckbox extends ABMobileViewFormCheckboxCore {
   async init() {}

   valueClear() {
      const myInput = this.myField;
      if (myInput) {
         myInput.checked = false;
      }
   }

   valueLoad(rowData) {
      const myInput = this.myField;
      if (myInput) {
         let field = this.field();
         let val = rowData[field.columnName] || false;
         if (typeof val === "string") val = JSON.parse(val);
         myInput.checked = val;
      }
   }

   valueGet(rowData) {
      const myField = this.myField;
      if (myField) {
         const field = this.field();
         rowData[field.columnName] = myField.checked ? 1 : 0;
      }
   }

   inputElement($h) {
      let field = this.field();
      let $inputElement = $h`
         <input 
            id=${this.idFormElement}
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
