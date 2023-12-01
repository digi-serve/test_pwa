import ABMobileViewFormItemCore from "../../core/mobile/ABMobileViewFormItemCore";

export default class ABMobileViewFormItem extends ABMobileViewFormItemCore {
   // constructor(values, application, parent, defaultValues) {
   //    super(values, application, parent, defaultValues);
   // }
   // warningsEval() {
   //    super.warningsEval();
   //    let allViews = this.views();
   //    if (allViews.length == 0) {
   //       this.warningsMessage("has no sub views");
   //    }
   //    (this.pages() || []).forEach((p) => {
   //       p.warningsEval();
   //    });
   // }

   updateProperties($inputElement) {
      // NOTE: the $h returns an object that we can update with
      // the properties.
      // I have been unable to get the following approach to work:
      // $inputElement = $h`
      //    <input
      //       name=${field.columnName}
      //       placeholder=${placeholder}
      //       type="text"
      //       ${ this.settings.required: "required" : "" }
      //       ${ this.settings.required: "validate" : "" }
      //       ${ this.settings.disable: `disabled="disabled"` : "" }
      //    />
      // `;
      // So I am updating the object directly:
      // $inputElement.props[]

      if (this.settings.required) {
         $inputElement.props["required"] = "";
         $inputElement.props["validate"] = "";
      }

      if (this.settings.disable) {
         $inputElement.props["disabled"] = "disabled";
      }
   }
}
