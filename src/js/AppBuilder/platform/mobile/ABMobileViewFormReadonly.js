import ABMobileViewFormReadonlyCore from "../../core/mobile/ABMobileViewFormReadonlyCore";

export default class ABMobileViewFormReadonly extends ABMobileViewFormReadonlyCore {
   inputElement($h) {
      let field = this.field();
      let placeholder = this.settings.placeholder ?? "";

      let $inputElement = $h`
               <input
                  type="text"
                  id=${this.idFormElement}
                  name=${field.columnName}
                  placeholder=${placeholder}
                  disabled="disabled"
               />
            `;

      // this.updateProperties($inputElement);

      return $inputElement;
   }
}
