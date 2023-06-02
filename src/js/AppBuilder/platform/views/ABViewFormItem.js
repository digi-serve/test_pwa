import ABViewFormItemCore from "../../core/views/ABViewFormItemCore";
// const ABViewFormItemComponent = require("./viewComponent/ABViewFormItemComponent");

// const ABViewFormFieldPropertyComponentDefaults =
//    ABViewFormItemCore.defaultValues();

export default class ABViewFormItem extends ABViewFormItemCore {
   // constructor(values, application, parent, defaultValues) {
   //    super(values, application, parent, defaultValues);
   // }

   static get componentUI() {
      console.error(
         "DEPRECIATED: ABViewFormItem.componentUI(): who is calling this?"
      );
      return null;

      // return ABViewFormItemComponent;
   }

   /**
    * @method component()
    * return a UI component based upon this view.
    * @return {obj} UI component
    */
   component() {
      console.error(
         "DEPRECIATED: ABViewFormItem.component(): who is calling this?"
      );
      return null;

      // return new ABViewFormItemComponent(this);
   }

   /**
    * @method parentFormUniqueID
    * return a unique ID based upon the closest form object this component is on.
    * @param {string} key  The basic id string we will try to make unique
    * @return {string}
    */
   parentFormUniqueID(key) {
      var form = this.parentFormComponent();
      var uniqueInstanceID;
      if (form) {
         uniqueInstanceID = form.uniqueInstanceID;
      } else {
         uniqueInstanceID = webix.uid();
      }

      return key + uniqueInstanceID;
   }
}
