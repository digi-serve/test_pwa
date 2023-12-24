/**
 * @Class ABViewRuleListFormRecordRules
 * On the ab_platform_service platform, the ABRecordRule is just
 * a blank stub. These only operate on the WEB platform, but are
 * referenced by our FORM components.
 */
export default class ABViewRuleListFormRecordRules {
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
   async formLoad() {
      console.error("TODO: implement RecordRules.formLoad()!");
   }
   async fromSettings() {
      console.error("TODO: implement RecordRules.fromSettings()!");
   }
   async objectLoad() {
      console.error("TODO: implement RecordRules.objectLoad()!");
   }

   async rulesReady() {
      console.error("TODO: implement RecordRules.rulesReady()!");
   }

   async processPre() {
      console.error("TODO: implement RecordRules.processPre()!");
   }

   async process() {
      console.error("TODO: implement RecordRules.process()!");
   }
}
