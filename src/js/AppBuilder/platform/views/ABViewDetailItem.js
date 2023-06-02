import ABViewDetailItemCore from "../../core/views/ABViewDetailItemCore";
// const ABViewDetailItemComponent = require("./viewComponent/ABViewDetailItemComponent");

export default class ABViewDetailItem extends ABViewDetailItemCore {
   // constructor(values, application, parent, defaultValues) {
   //    super(values, application, parent, defaultValues);
   // }

   /**
    * @method component()
    * return a UI component based upon this view.
    * @return {obj} UI component
    */
   component() {
      console.error(
         "DEPRECIATED: ABViewDetailItem.component():  Who is calling this?"
      );
      return null;
      // return new ABViewDetailItemComponent(this);
   }
}
