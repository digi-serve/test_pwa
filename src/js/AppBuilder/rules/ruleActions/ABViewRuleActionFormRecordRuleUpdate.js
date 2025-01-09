//
// ABViewRuleActionFormRecordRuleUpdate
//
// An action that allows you to update fields on an object that was currently
// Added/Updated.
//
//
import ABViewRuleActionObjectUpdater from "./ABViewRuleActionObjectUpdater";

export default class ABViewRuleActionFormRecordRuleUpdate extends ABViewRuleActionObjectUpdater {
   /**
    * @param {object} App
    *      The shared App object that is created in OP.Component
    * @param {string} idBase
    *      Identifier for this component
    */
   constructor(App, idBase, currentForm) {
      super(App, idBase, currentForm);

      this.key = "ABViewRuleActionFormRecordRuleUpdate";
      this.label = "Update Record";
   }

   get isPreProcess() {
      return true;
   }
}
