/**
 * @Class ABViewRuleListFormSubmitRules
 * On the ab_platform_service platform, the ABRecordRule is just
 * a blank stub. These only operate on the WEB platform, but are
 * referenced by our FORM components.
 */
import ABViewRuleList from "./ABViewRuleList";
import ABViewRule from "./ABViewRule";

import RoleConfirmMessage from "./ruleActions/ABViewRuleActionFormSubmitRuleConfirmMessage";
import RuleExistPage from "./ruleActions/ABViewRuleActionFormSubmitRuleExistPage";
// const RuleParentPage = require("./ruleActions/ABViewRuleActionFormSubmitRuleParentPage");
// const RuleClosePopup = require("./ruleActions/ABViewRuleActionFormSubmitRuleClosePopup");
// const RuleWebsite = require("./ruleActions/ABViewRuleActionFormSubmitRuleWebsite");
// const RuleEmail = require("./ruleActions/ABViewRuleActionFormSubmitRuleEmail");

export default class ABViewRuleListFormSubmitRules extends ABViewRuleList {
   constructor() {
      var settings = {
         labels: {
            header: "ab.component.form.submitRule",
            headerDefault: "Submit Rules",
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

   async formLoad() {
      console.error("TODO: implement SubmitRules.formLoad()!");
   }

   async fromSettings() {
      console.error("TODO: implement SubmitRules.fromSettings()!");
   }

   async objectLoad() {
      console.error("TODO: implement SubmitRules.objectLoad()!");
   }

   async process() {
      console.error("TODO: implement SubmitRules.process()!");
   }

   // must return the actual Rule object.
   getRule() {
      var listActions = [
         new RoleConfirmMessage(
            this.App,
            `${this.idBase}_ruleActionConfirmMessage`
         ),
         new RuleExistPage(this.App, `${this.idBase}_ruleActionExistPage`),
         new RuleParentPage(this.App, `${this.idBase}_ruleActionParentPage`),
         new RuleClosePopup(this.App, `${this.idBase}_ruleActionClosePopup`),
         new RuleWebsite(this.App, `${this.idBase}_ruleActionWebsite`),
         new RuleEmail(this.App, `${this.idBase}_ruleActionEmail`),
      ];

      var Rule = new ABViewRule(listActions);
      Rule.objectLoad(this.currentObject);
      Rule.formLoad(this.currentForm);
      return Rule;
   }
}
