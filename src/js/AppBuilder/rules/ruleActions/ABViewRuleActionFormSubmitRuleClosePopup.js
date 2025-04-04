//
// ABViewRuleActionFormSubmitRuleClosePopup
//
//
//
import ABViewRuleAction from "../ABViewRuleAction";

export default class ABViewRuleActionFormSubmitRuleClosePopup extends ABViewRuleAction {
   /**
    * @param {object} App
    *      The shared App object that is created in OP.Component
    * @param {string} idBase
    *      Identifier for this component
    */
   constructor(App, idBase) {
      super();

      this.App = App;
      this.key = "ABViewRuleActionFormSubmitRuleClosePopup";
      this.label = "Close the current popup";

      this.currentObject = null; // the object this Action is tied to.

      this.formRows = []; // keep track of the Value Components being set
      // [
      //		{ fieldId: xxx, value:yyy, type:key['string', 'number', 'date',...]}
      // ]
   }

   // conditionFields() {
   //    var fieldTypes = ["string", "number", "date", "formula", "calculate"];

   //    var currFields = [];

   //    if (this.currentObject) {
   //       this.currentObject.fields().forEach((f) => {
   //          if (fieldTypes.indexOf(f.key) != -1) {
   //             // NOTE: the .id value must match the obj[.id]  in the data set
   //             // so if your object data looks like:
   //             // 	{
   //             //		name_first:'Neo',
   //             //		name_last: 'The One'
   //             //  },
   //             // then the ids should be:
   //             // { id:'name_first', value:'xxx', type:'string' }
   //             currFields.push({
   //                id: f.columnName,
   //                value: f.label,
   //                type: f.key
   //             });
   //          }
   //       });
   //    }

   //    return currFields;
   // }

   // // valueDisplayComponent
   // // Return an ABView to display our values form.
   // //
   // valueDisplayComponent(idBase) {
   //    this._ui = {
   //       ui: {
   //          view: "layout",
   //          rows: [],
   //       },

   //       init: () => {},
   //    };

   //    return this._ui;
   // }

   // process
   // gets called when a form is submitted and the data passes the Query Builder Rules.
   // @param {obj} options
   process(options) {
      return new Promise((resolve, reject) => {
         let form = options.form;
         if (!form) return;

         let popup = form.pageParent((p) => p.settings.type == "popup");
         if (!popup) return;

         // get the dom id of page. it is dom id that is generated in ABLiveTool.js
         // let pageDomId = ["ab_live_page", popup.application.id, popup.id].join(
         //    "_"
         // );

         // close current popup
         popup.hide();

         // this clears the UI's record of the current form.
         options.form.changePage(null);

         resolve();
      });
   }
}
