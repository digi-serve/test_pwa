//
// ABViewRuleAction
//
// A component that manages an individual Action in a Rule.
//
// Each Action is responsible for figuring out when it can run, and what to do.
//
// In live apps, Actions are used when processing events and determining if an
// if and what is to be performed:
//
//
//
// An Action needs to save it's current state to an objects settings, and to
// initialize itself from those settings.
//

export default class ABViewRuleAction {
   /**
    * @param {object} App
    *      The shared App object that is created in OP.Component
    * @param {string} idBase
    *      Identifier for this component
    * @param {ABViewForm} currentForm	the current form this Action is associated with.
    */
   constructor(App, idBase, currentForm) {
      this.key = "ABViewRuleAction";

      this.queryObject = null; // the current ABObject we use to create QueryBuilder information.

      this.currentForm = null;

      this.queryRules = {}; // default set of rules for the Query Builder condition

      this.valueRules = {}; // the initial Value Rules for this Action
      // The Action Subclass defines what this {} is.

      this.currentForm = currentForm; // the ABViewForm object that this rule Action is tied to.
   }
   /*
   component(App, idBase) {
      this.App = App;
      this.idBase = idBase;

      this.label = L("generic abviewruleaction");

      function myUnique(key) {
         return App.unique(`${idBase}_${key}`);
      }

      // internal list of Webix IDs to reference our UI components.
      var ids = (this.ids = {
         // each instance must be unique
         component: `${myUnique("component")}_${webix.uid()}`,
      });

      this._ui = null; // internally track our UI Component value Rules

      // for setting up UI
      this.init = (options) => {
         // register callbacks:
         for (var c in _logic.callbacks) {
            _logic.callbacks[c] = options[c] || _logic.callbacks[c];
         }
      };

      // internal business logic
      var _logic = (this._logic = {
         callbacks: {
            onDelete: function () {
               console.warn("NO onDelete()!");
            },
            onSave: function (field) {
               console.warn("NO onSave()!");
            },
         },
      });
   }
*/
   // condition
   // Return the querybuilder setup structure for this Action.
   // @return {array}  of querybuilder setup
   //					[
   //						{rules},
   //						[fields]
   //					]
   condition() {
      return [this.conditionRules(), this.conditionFields()];
   }

   // stashCondition
   // capture the current set of rules provided by the QB object.
   // This doesn't guarantee these will be saved to the App settings.
   // Instead it is a temporary stash. Only the selected Action's
   // values will be persisited to the App settings.
   // @param {obj/Array} rules  The QueryBuilder rule value returned from
   //							 .getValue()
   //							 note: it is the first entry .getValue()[0]
   //
   stashCondition(rules) {
      // check to see if they sent us the raw QueryBuilder values and only
      // pull off the rules if they did
      if (Array.isArray(rules)) {
         rules = rules[0];
      }

      // sanity check on glue value: don't update if null or not given.
      if (rules) {
         // sometimes .glue is undefined  so default to 'and'
         if (rules.glue != "or") rules.glue = "and";

         this.queryRules = rules;
      }
   }

   // conditionFields()
   // Return the list of fields we are able to update.
   // @return {array} of querybuilder field definitions:
   //					[
   // 						{ id:"fname",   value:"First Name", type:"string" },
   //					    { id:"lname",   value:"Last Name",  type:"string" },
   //					    { id:"age",     value:"Age",        type:"number" },
   //					    { id:"bdate",   value:"Birth Date", type:"date" }
   //					]
   conditionFields() {
      var fieldTypes = ["string", "number", "date", "formula", "calculate"];

      var currFields = [];

      if (this.queryObject) {
         this.queryObject.fields().forEach((f) => {
            if (fieldTypes.indexOf(f.key) != -1) {
               // NOTE: the .id value must match the obj[.id]  in the data set
               // so if your object data looks like:
               // 	{
               //		name_first:'Neo',
               //		name_last: 'The One'
               //  },
               // then the ids should be:
               // { id:'name_first', value:'xxx', type:'string' }
               currFields.push({
                  id: f.columnName,
                  value: f.label,
                  type: f.key,
               });
            }
         });
      }

      return currFields;
   }

   // conditionRules()
   // Return the current rule definition object for this Action.
   // @return {obj}
   conditionRules() {
      return this.queryRules;
   }

   // objectLoad
   // save the current object this Action is associated with.
   objectLoad(object) {
      // this.currentObject = object;				// DO WE NEED THIS?
      this.queryObjectLoad(object);
   }

   // queryObjectLoad
   // save the current object this Action is using to build query rules.
   queryObjectLoad(object) {
      this.queryObject = object;
   }

   formLoad(form) {
      this.currentForm = form;
   }

   // process
   // gets called when a form is submitted and the data passes the Query Builder Rules.
   // @param {obj} options
   // @return {Promise}
   process(options) {
      console.error(
         "!!! ABViewRuleAction.process() should be overridden by its child class."
      );
      return new Promise((resolve, reject) => {
         reject(
            new Error(
               "ABViewRuleAction.process() should be overridden by its child class."
            )
         );
      });
   }

   // // valueDisplay
   // // create the form to collect the specific data this Action needs to function.
   // // @param {string} webixID  the $$(webixID) of the area to insert our display.
   // valueDisplay(webixID) {
   //    return this.valueDisplayComponent(webixID);
   // }

   // // valueDisplayComponent
   // // Return an ABView to display our values form.
   // //
   // valueDisplayComponent(idBase) {
   //    return (this._ui = {
   //       ui: {
   //          template: "ABViewRuleAction.valueDisplayComponent",
   //       },
   //       init: (data) => {
   //          console.error(
   //             "!!! ABViewRuleAction.valueDisplayComponent() should be overridden."
   //          );
   //          console.warn(" --> passed in data:", data);
   //       },
   //    });
   // }

   // fromSettings
   // initialize this Action from a given set of setting values.
   // @param {obj}  settings
   fromSettings(settings) {
      // settings: {
      //	valueRules:{}
      // }
      settings = settings ?? {};
      this.valueRules = settings.valueRules ?? settings;
   }

   // toSettings
   // return an object that represents the current state of this Action
   // @return {obj}
   toSettings() {
      var settings = {};

      // require the child to insert the valueRules
      return settings;
   }

   /**
    * @method isReady()
    * returns a promise that gets resolved once our action is ready to work.
    * @return {Promise}
    */
   isReady() {
      return Promise.resolve();
   }

   // // NOTE: Querybuilder v5.2 has a bug where it won't display the [and/or]
   // // choosers properly if it hasn't been shown before the .setValue() call.
   // // so this work around allows us to refresh the display after the .show()
   // // on the popup.
   // // When they've fixed the bug, we'll remove this workaround:
   // qbFixAfterShow() {
   //    // our child classes can implement this if needed.
   //    // 	- ABViewRuleActionFormRecordRuleUpdateConnected
   // }
}
