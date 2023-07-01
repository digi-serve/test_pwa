import formTextbox from "./formTextbox.f7.jsx";
import formSelect from "./formSelect.f7.jsx";

export default class F7ViewForm {
   // constructor(dcID, allDCs, $, $f7, $store, record) {
   constructor(settings, parent, AB) {
      this.dcID = settings.dcID;
      this.formID = settings.formID;
      this.parent = parent;
      this.Application = parent.Application;

      this.AB = AB;
      this.$f7 = AB.$f7;
      this.$ = AB.$;
      this.$store = AB.$store;
      this.isLoading = false;
      this.record = null;

      this.views = [
         {
            key: "text",
            id: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
            label: "Name",
            field: "Name",
            placeholder: "Your name",
         },
         {
            key: "email",
            id: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
            label: "E-mail",
            field: "Email",
            placeholder: "Your email address",
         },
         {
            key: "text",
            id: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
            label: "URL",
            field: "URL",
            placeholder: "Your website URL",
         },
         {
            key: "text",
            id: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
            label: "Phone",
            field: "Phone",
            placeholder: "Your phone number",
         },
         {
            key: "selectsingle",
            id: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
            label: "Gender",
            field: "Gender",
            placeholder: "Select your gender",
         },
      ];
   }

   get datacollection() {
      return this.AB.datacollectionByID(this.dcID);
   }

   /**
    * @method getFormValues
    *
    * @param {webix form} formView
    * @param {ABObject} obj
    * @param {ABDatacollection} dc
    * @param {ABDatacollection} dcLink [optional]
    */
   /*   getFormValues(formView, obj, dc, dcLink) {
      // get the fields that are on this form
      const visibleFields = ["id"]; // we always want the id so we can udpate records
      formView.getValues(function (obj) {
         visibleFields.push(obj.config.name);
      });

      // only get data passed from form
      const allVals = formView.getValues();
      const formVals = {};
      visibleFields.forEach((val) => {
         formVals[val] = allVals[val];
      });

      // get custom values
      this.fieldComponents(
         (comp) =>
            comp instanceof ABViewFormCustom ||
            comp instanceof ABViewFormConnect ||
            comp instanceof ABViewFormDatepicker ||
            comp instanceof ABViewFormSelectMultiple ||
            (comp instanceof ABViewFormJson && comp.settings.type == "filter")
      ).forEach((f) => {
         const vComponent = this.viewComponents[f.id];
         if (vComponent == null) return;

         const field = f.field();
         if (field) {
            const getValue = vComponent.getValue ?? vComponent.logic.getValue;
            if (getValue)
               formVals[field.columnName] = getValue.call(vComponent, formVals);
         }
      });

      // remove connected fields if they were not on the form and they are present in the formVals because it is a datacollection
      obj.connectFields().forEach((f) => {
         if (
            visibleFields.indexOf(f.columnName) == -1 &&
            formVals[f.columnName]
         ) {
            delete formVals[f.columnName];
            delete formVals[f.relationName()];
         }
      });

      // clear undefined values or empty arrays
      for (const prop in formVals) {
         if (formVals[prop] == null || formVals[prop].length == 0)
            formVals[prop] = "";
      }

      // Add parent's data collection cursor when a connect field does not show
      let linkValues;

      if (dcLink) {
         linkValues = dcLink.getCursor();
      }

      if (linkValues) {
         const objectLink = dcLink.datasource;

         const connectFields = obj.connectFields();
         connectFields.forEach((f) => {
            const formFieldCom = this.fieldComponents(
               (fComp) => fComp?.field?.()?.id === f?.id
            );

            if (
               objectLink.id == f.settings.linkObject &&
               formFieldCom.length < 1 && // check field does not show
               formVals[f.columnName] === undefined
            ) {
               const linkColName = f.indexField
                  ? f.indexField.columnName
                  : objectLink.PK();

               formVals[f.columnName] = {};
               formVals[f.columnName][linkColName] =
                  linkValues[linkColName] ?? linkValues.id;
            }
         });
      }

      // NOTE: need to pull data of current cursor to calculate Calculate & Formula fields
      // .formVals variable does not include data that does not display in the Form widget
      const cursorFormVals = Object.assign(dc.getCursor() ?? {}, formVals);

      // Set value of calculate or formula fields to use in record rule
      obj.fields((f) => f.key == "calculate" || f.key == "formula").forEach(
         (f) => {
            if (formVals[f.columnName] == null) {
               let reCalculate = true;

               // WORKAROUND: If "Formula" field will have Filter conditions,
               // Then it is not able to re-calculate on client side
               // because relational data is not full data so FilterComplex will not have data to check
               if (f.key == "formula" && f.settings?.where?.rules?.length > 0) {
                  reCalculate = false;
               }

               formVals[f.columnName] = f.format(cursorFormVals, reCalculate);
            }
         }
      );

      return formVals;
   }
   */

   async save(btn) {
      this.$("#" + btn).addClass("button-loading");
      var formData = this.$f7.form.convertToData(`#${this.formID}`);

      //convert toggle back to boolean
      formData.Toggle = formData.Toggle.length ? 1 : 0;
      //convert date to JS Date().toString()
      formData.Birthday = new Date(formData.Birthday).toISOString();
      // console.log(formData);
      // alert(JSON.stringify(formData));

      // save to server:
      for (var p in formData) {
         this.record[p] = formData[p];
      }
      console.log("save(): updated record:", this.record);
      const DC = this.datacollection;
      try {
         var updatedRecord = await DC.datasource
            .model()
            .update(this.record[DC.datasource.PK()], this.record);

         // on success, go back to list page
         this.$f7.views.current.router.back();
      } catch (e) {
         console.error(e);
         // TODO: popup here:
         const L = this.AB.Label();
         var text = L("Save Failed");

         // @TODO: instead of stuffing errors into popup message, find the input controls
         // and set them to invalid markers, and add the message to them if possible.

         if (e.errors) {
            try {
               if ("string" == typeof e.errors) e.errors = JSON.parse(e.errors);
            } catch (e) {
               // ignore
            }

            (e.errors || []).forEach((valError) => {
               text = `${text}<br>${valError.name}: ${valError.message}`;
            });
         }

         this.$f7.toast
            .create({
               icon: '<i class="material-icons">error</i>',
               text,
               position: "center",
               closeTimeout: 2000,
            })
            .open();
      }

      this.$("#" + btn).removeClass("button-loading");

      // this.$store.dispatch("updateRecord", {
      //    dcID: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
      //    recordID: this.record.uuid,
      //    record: formData,
      // });
      // setTimeout(() => {
      //    this.$("#" + btn).removeClass("button-loading");
      // }, 1000);
   }

   init() {
      this.record = this.datacollection.getCursor();
      console.log("form: record:", this.record);

      //convert boolean for toggle UI
      if (this.record) {
         this.record.Toggle = this.record.Toggle ? "on" : "off";
         //convert date for date UI
         if (this.record.Birthday) {
            var MyDate = new Date(this.record.Birthday);
            var MyDateString =
               MyDate.getFullYear() +
               "-" +
               ("0" + (MyDate.getMonth() + 1)).slice(-2) +
               "-" +
               ("0" + MyDate.getDate()).slice(-2);
            this.record.Birthday = MyDateString;
         }
         //fill in form
         this.$f7.form.fillFromData(`#${this.formID}`, this.record);

         // listen for when we remove the preloader on the smart select then set the value to the select
         // this is just a hack to get the value of the smart select set we may be able to take this out
         if (this.$f7.$(".smartSelectCountry .item-after .preloader").length) {
            this.$(
               ".smartSelectCountry .item-after .preloader"
            )[0].addEventListener("DOMNodeRemoved", () => {
               this.$f7
                  .$(
                     "select[name='Country'] option[value='" +
                        this.record.Country +
                        "']"
                  )
                  .prop("selected", "selected");
            });
         }
      }
   }

   viewHTML() {
      let allResults = [];

      // let views = Page.views();
      // views.forEach((v) => {
      // allResults.push(v.html(...));
      // })
      this.views.forEach((view) => {
         switch (view.key) {
            case "email":
            case "text":
               var textbox = new formTextbox(
                  view,
                  this.allDCs,
                  this.$f7,
                  this.$store,
                  this.record
               );
               allResults.push(textbox.html());
               break;
            case "selectmultiple":
            case "selectsingle":
               var select = new formSelect(
                  view,
                  this.allDCs,
                  this.$f7,
                  this.$store,
                  this.record
               );
               allResults.push(select.html());
               break;
            default:
            // code block
         }
      });

      return allResults.map((r) => r()); // render each jsx template
   }

   html() {
      const L = this.AB.Label();
      return () => (
         <form
            class="list list-inset list-strong-ios list-dividers-ios list-outline-ios"
            id={this.formID}
         >
            <ul>
               {this.viewHTML()}
               <li>
                  <div class="item-content item-input">
                     <div class="item-inner">
                        <div class="item-title item-label">Birthday</div>
                        <div class="item-input-wrap">
                           <input
                              name="Birthday"
                              type="date"
                              placeholder="Birthday"
                           />
                        </div>
                     </div>
                  </div>
               </li>
               <li>
                  <div class="item-content">
                     <div class="item-inner">
                        <div class="item-title">Toggle</div>
                        <div class="item-after">
                           <label class="toggle toggle-init">
                              <input name="Toggle" type="checkbox" />
                              <span class="toggle-icon"></span>
                           </label>
                        </div>
                     </div>
                  </div>
               </li>
               <li>
                  <div class="item-content item-input">
                     <div class="item-inner">
                        <div class="item-title item-label">Slider</div>
                        <div class="item-input-wrap">
                           <div
                              class="range-slider range-slider-init"
                              data-label="true"
                           >
                              <input
                                 name="Slider"
                                 type="range"
                                 value="50"
                                 min="0"
                                 max="100"
                                 step="1"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </li>
               <li class="align-top">
                  <div class="item-content item-input">
                     <div class="item-inner">
                        <div class="item-title item-label">Resizable</div>
                        <div class="item-input-wrap">
                           <textarea
                              name="Bio"
                              placeholder="Bio"
                              class="resizable"
                           ></textarea>
                        </div>
                     </div>
                  </div>
               </li>
            </ul>
            <div class="block">
               <a
                  onClick={() => this.save("saveButton")}
                  id="saveButton"
                  class="button button-large button-fill button-preloader"
                  href="#"
               >
                  <span class="preloader"></span>
                  <span>{L("Save")}</span>
               </a>
            </div>
         </form>
      );
   }
}
