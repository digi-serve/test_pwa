//
// ABViewRuleActionFormSubmitRuleWebsite
//
//
//
import ABViewRuleAction from "../ABViewRuleAction";
import ABFieldConnect from "../../platform/dataFields/ABFieldConnect";
import ABFieldEmail from "../../platform/dataFields/ABFieldEmail";

export default class ABViewRuleActionFormSubmitRuleEmail extends ABViewRuleAction {
   /**
    * @param {object} App
    *      The shared App object that is created in OP.Component
    * @param {string} idBase
    *      Identifier for this component
    */
   constructor(App, idBase) {
      super();

      this.App = App;
      this.key = "ABViewRuleActionFormSubmitRuleEmail";
      this.label = "Send a custom email";

      this.queryObject = null; // the object this Action is tied to.

      this.formRows = []; // keep track of the Value Components being set
      // [
      //		{ fieldId: xxx, value:yyy, type:key['string', 'number', 'date',...]}
      // ]
   }

   // conditionFields() {
   //    var fieldTypes = ["string", "number", "date", "formula", "calculate"];

   //    var currFields = [];

   //    if (this.queryObject) {
   //       this.queryObject.fields().forEach((f) => {
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

   // process
   // gets called when a form is submitted and the data passes the Query Builder Rules.
   // @param {obj} options - {
   //							data: {obj} rowData,
   //							form: {ABViewForm}
   //						}
   process(options) {
      // validate sender's email is invalid
      if (!this.AB.isEmail(this.valueRules.fromEmail)) {
         return Promise.resolve();
      }

      var recipients = [];

      return Promise.resolve()
         .then(() => {
            // Pull recipients data
            return new Promise((resolve, reject) => {
               var tasks = [];

               this.valueRules.toEmails.forEach((rec) => {
                  tasks.push(
                     new Promise((next, err) => {
                        // TODO: Cc, Bcc

                        // field
                        if (rec.emailType == "field") {
                           var emailFieldUrl = rec.value.split("|")[1]; // linkFieldId|emailFieldUrl

                           if (emailFieldUrl) {
                              console.error(
                                 "@TODO: SubmitRuleEmail: why are we using a URL to find a field? Tell Designer to stop storing that!"
                              );
                           }
                           var emailField =
                              this.queryObject.application.urlResolve(
                                 emailFieldUrl
                              );
                           if (emailField) {
                              // Pull email source object
                              if (emailField.object.id == this.queryObject.id) {
                                 var emailData =
                                    options.data[emailField.columnName];
                                 if (emailData)
                                    recipients = recipients.concat(emailData);
                              }
                              // Pull emails from link object
                              else {
                                 let linkFieldId = rec.value.split("|")[0];
                                 let linkFields = this.queryObject.fields(
                                    (f) =>
                                       f instanceof ABFieldConnect &&
                                       f.id == linkFieldId
                                 );
                                 linkFields.forEach((f) => {
                                    var linkedData =
                                       options.data[f.relationName()] || [];

                                    // convert to an array
                                    if (
                                       linkedData &&
                                       !Array.isArray(linkedData)
                                    )
                                       linkedData = [linkedData];

                                    // pull email address
                                    linkedData.forEach((d) => {
                                       var email = d[emailField.columnName];
                                       if (email)
                                          recipients = recipients.concat(email);
                                    });
                                 });
                              }

                              next();
                           } else {
                              next();
                           }
                        }

                        // query
                        else if (rec.emailType == "query") {
                           var dvIdAndFieldId = rec.value; // ABDatacollectionId|fieldId
                           if (!dvIdAndFieldId) return next();

                           var dcId = dvIdAndFieldId.split("|")[0];
                           var fieldId = dvIdAndFieldId.split("|")[1];

                           var dcQuery =
                              this.currentForm.AB.datacollectionByID(dcId);
                           if (!dcQuery) return next();

                           var field = dcQuery.datasource.fieldByID(fieldId);
                           if (!field) return next();

                           // get data of data collection
                           dcQuery.getData().forEach((data) => {
                              var emailAddr = data[field.columnName];
                              if (emailAddr) recipients.push(emailAddr);
                           });

                           next();
                        }

                        // email
                        else {
                           recipients.push(rec.value);
                           next();
                        }
                     })
                  );
               });

               Promise.all(tasks).catch(reject).then(resolve);
            });
         })
         .then(() => {
            // send out
            return new Promise((resolve, reject) => {
               recipients = this.AB.uniq(recipients).filter((r) => r);

               if (!recipients || recipients.length < 1) return resolve();

               // replace form value to template
               var fromName = this.valueRules.fromName,
                  subject = this.valueRules.subject,
                  message = this.valueRules.message;

               this.queryObject
                  .fields((f) => f.fieldUseAsLabel())
                  .forEach((f) => {
                     var template = new RegExp(`{${f.label}}`, "g"),
                        data = f.format(options.data);

                     fromName = fromName.replace(template, data);
                     subject = subject.replace(template, data);
                     message = message.replace(template, data);
                  });

               // send a email
               this.AB.Network.post({
                  url: "/app_builder/email",
                  params: {
                     fromName: fromName,
                     fromEmail: this.valueRules.fromEmail,
                     subject: subject,
                     message: message,
                     recipients: this.AB.uniq(recipients),
                  },
               })
                  .then(() => {
                     resolve();
                  })
                  .catch(reject);
            });
         });
   }

   // // fromSettings
   // // initialize this Action from a given set of setting values.
   // // @param {obj}  settings
   // fromSettings(settings) {
   //    settings = settings || {};
   //    super.fromSettings(settings); // let the parent handle the QB

   //    // if we have a display component, then populate it:
   //    if (this._ui) {
   //       // now we handle our valueRules:{} object settings.
   //       // pass the settings off to our DisplayList component:
   //       this._ui.fromSettings(settings.valueRules);
   //    }
   // }

   // // toSettings
   // // return an object that represents the current state of this Action
   // // @return {obj}
   // toSettings() {
   //    // settings: {
   //    //	message:''
   //    // }

   //    // let our parent store our QB settings
   //    var settings = super.toSettings();

   //    settings.valueRules = this._ui.toSettings();

   //    return settings;
   // }
}
