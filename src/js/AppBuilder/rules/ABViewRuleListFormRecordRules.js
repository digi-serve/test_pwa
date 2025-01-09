/**
 * @Class ABViewRuleListFormRecordRules
 * On the ab_platform_service platform, the ABRecordRule is just
 * a blank stub. These only operate on the WEB platform, but are
 * referenced by our FORM components.
 */
import ABViewRuleList from "./ABViewRuleList";
import ABViewRule from "./ABViewRule";

import RoleUpdateExisting from "./ruleActions/ABViewRuleActionFormRecordRuleUpdate";
import RoleInsertConnected from "./ruleActions/ABViewRuleActionFormRecordRuleInsertConnected";
import RoleUpdateConnected from "./ruleActions/ABViewRuleActionFormRecordRuleUpdateConnected";
import RoleRemoveConnected from "./ruleActions/ABViewRuleActionFormRecordRuleRemoveConnected";

export default class ABViewRuleListFormRecordRules extends ABViewRuleList {
   constructor() {
      var settings = {
         labels: {
            header: "ab.components.form.recordRules",
            headerDefault: "Record Rules",
         },
      };
      super(settings);
   }

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

   /**
    * @method isReady()
    * returns a promise that gets resolved once our list of Rules is
    * ready to work.
    * @return {Promise}
    */
   async rulesReady() {
      var allReady = (this.listRules || []).map((r) => r.isReady());
      await Promise.all(allReady);
   }

   // must return the actual Rule object.
   getRule() {
      var listActions = [
         new RoleUpdateExisting(
            this.App,
            `${this.idBase}_ruleActionUpdate`,
            this.currentForm
         ),
         new RoleInsertConnected(
            this.App,
            `${this.idBase}_ruleActionInsert`,
            this.currentForm
         ),
         new RoleUpdateConnected(
            this.App,
            `${this.idBase}_ruleActionUpdateConnected`,
            this.currentForm
         ),
         new RoleRemoveConnected(
            this.App,
            `${this.idBase}_ruleActionRemoveConnected`,
            this.currentForm
         ),
      ];

      var Rule = new ABViewRule(listActions);
      if (this.currentObject) {
         Rule.objectLoad(this.currentObject);
      }
      return Rule;
   }
}
