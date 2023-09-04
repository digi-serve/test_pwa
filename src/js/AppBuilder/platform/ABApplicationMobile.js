const _ = require("lodash");

// prettier-ignore
import ABApplicationMobileCore from "../core/ABApplicationMobileCore.js";

import ABViewPageMobile from "./mobile/ABMobilePage";
const ABViewManager = require("./ABViewManager");

export default class ABClassApplicationMobile extends ABApplicationMobileCore {
   constructor(attributes, AB) {
      super(attributes, AB);
   }

   ///
   /// Definition
   ///

   /**
    * @method pageNew()
    * return a new instance of an ABViewPageMobile
    * @param values
    *        The initial settings for the page.
    * @return {ABViewPageMobile}
    */
   pageNew(values) {
      return new ABViewPageMobile(values, this);
   }
}
