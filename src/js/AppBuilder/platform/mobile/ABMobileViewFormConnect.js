/**
 * ABMobileViewFormConnect
 * The view that displays a form textbox on the screen.
 */

import ABMobileViewFormConnectCore from "../../core/mobile/ABMobileViewFormConnectCore.js";
import formSelectMultiple from "./ViewFormSelectMultiple.js";
import formSelectSingle from "./ViewFormSelectSingle.js";

export default class ABMobileViewFormConnect extends ABMobileViewFormConnectCore {
   // constructor(...params) {
   //    super(...params);
   // }

   async init() {}

   html($h) {
      let field = this.field();
      const formComponent =
         field.settings.linkType === "one"
            ? new formSelectSingle(this.AB, field)
            : new formSelectMultiple(this.AB, field);

      return formComponent.html($h);
   }
}
