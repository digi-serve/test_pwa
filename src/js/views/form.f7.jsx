import FormButton from "./formButton.f7.jsx";
import FormCheckbox from "./formCheckbox.f7.jsx";
import FormConnect from "./formConnect.f7.jsx";
import FormCustom from "./formCustom.f7.jsx";
import FormDatepicker from "./formDatepicker.f7.jsx";
import FormJSON from "./formJSON.f7.jsx";
import FormNumber from "./formNumber.f7.jsx";
import FormReadonly from "./formReadonly.f7.jsx";
import FormSelectMultiple from "./formSelectMultiple.f7.jsx";
import FormSelectSingle from "./formSelectSingle.f7.jsx";
import FormTextbox from "./formTextbox.f7.jsx";
import FormTree from "./formTree.f7.jsx";

export default class F7ViewForm {
   #AB;
   #settings;
   constructor(AB, settings) {
      this.#AB = AB;
      this.#settings = settings;

      this.record = null;
      this.isLoading = false;

      const definitions = this.datacollection.datasource
         .fields()
         .map((f) => ({
            id: f.id,
            key: f.formComponent().common().key,
            field: f.columnName,
            fieldType: f.key,
            label: f.label,
            // placeholder: f.placeholder,
            settings: f.settings,
         }))
         .concat({
            id: "saveButton",
            key: "button",
            field: null,
            fieldType: null,
            label: "Save",
            // placeholder: null,
         });

      this.views = definitions.map((definition) => {
         if (definition.settings) definition.settings.required = 1;

         switch (definition.key) {
            case "button":
               return new FormButton(AB, this, definition);

            case "checkbox":
               return new FormCheckbox(AB, this, definition);

            case "connect":
               return new FormConnect(AB, this, definition);

            case "fieldcustom":
               return new FormCustom(AB, this, definition);

            case "datepicker":
               return new FormDatepicker(AB, this, definition);

            case "json":
               return new FormJSON(AB, this, definition);

            case "numberbox":
               return new FormNumber(AB, this, definition);

            case "fieldreadonly":
               return new FormReadonly(AB, this, definition);

            case "selectmultiple":
               return new FormSelectMultiple(AB, this, definition);

            case "selectsingle":
               return new FormSelectSingle(AB, this, definition);

            case "formtree":
               return new FormTree(AB, this, definition);

            default:
               return new FormTextbox(AB, this, definition);
         }
      });
   }

   get id() {
      return this.#settings.id;
   }

   get datacollection() {
      return this.#AB.datacollectionByID(this.#settings.dcID);
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

   async init() {
      const ab = this.#AB;

      const record = (this.record = this.datacollection.getCursor());

      if (record == null) return;

      //convert boolean for toggle UI
      const parsedRecord = {};

      this.views.forEach((view) => {
         if (view.definition.fieldType == null || view instanceof FormButton)
            return;

         switch (view.definition.fieldType) {
            case "boolean":
               parsedRecord[view.definition.field] =
                  record[view.definition.field] === 1 ? ["on"] : [];

               break;

            case "date":
               {
                  const date = record[view.definition.field];

                  parsedRecord[view.definition.field] = `${
                     date.getMonth() + 1
                  }/${date.getDate()}/${date.getFullYear()}`;
               }

               break;

            case "datetime":
               {
                  const datetime = new Date(record[view.definition.field]);
                  const hours = datetime.getHours();
                  const minutes = datetime.getMinutes();

                  parsedRecord[view.definition.field] = `${
                     datetime.getMonth() + 1
                  }/${datetime.getDate()}/${datetime.getFullYear()}, ${
                     hours <= 12 ? hours : hours % 12
                  }:${
                     minutes < 10
                        ? `0${minutes.toString()}`
                        : minutes.toString()
                  } ${hours < 12 ? "AM" : "PM"}`;
               }

               break;

            case "number":
               parsedRecord[view.definition.field] =
                  record[view.definition.field].toString();

               break;

            default:
               parsedRecord[view.definition.field] =
                  record[view.definition.field];

               break;
         }
      });

      //fill in form
      ab.$f7.form.fillFromData(`#${this.id}`, parsedRecord);

      // // listen for when we remove the preloader on the smart select then set the value to the select
      // // this is just a hack to get the value of the smart select set we may be able to take this out
      // if (ab.$f7.$(".smartSelectCountry .item-after .preloader").length) {
      //    ab.$(
      //       ".smartSelectCountry .item-after .preloader"
      //    )[0].addEventListener("DOMNodeRemoved", () => {
      //       ab.$f7
      //          .$(
      //             "select[name='Country'] option[value='" +
      //                this.#record.Country +
      //                "']"
      //          )
      //          .prop("selected", "selected");
      //    });
      // }
   }

   viewHTML() {
      const allResults = [];

      let fields = [];

      this.views.forEach((view) => {
         if (view.definition.fieldType == null) {
            if (view instanceof FormButton) {
               const renderedFieldElements = [...fields];

               if (fields.length > 0)
                  allResults.push(() => <ul>{renderedFieldElements}</ul>);

               allResults.push(view.html());

               fields = [];
            }

            return;
         }

         switch (view.definition.fieldType) {
            case "LongText":
               fields.push(<li class="align-top">{view.html()()}</li>);

               break;

            default:
               fields.push(<li>{view.html()()}</li>);

               break;
         }
      });

      if (fields.length > 0)
         allResults.push(() => <ul>{fields.map((r) => r())}</ul>);

      return allResults.map((r) => r()); // render each jsx template
   }

   html() {
      return () => (
         <form
            class="list list-inset list-strong-ios list-dividers-ios list-outline-ios"
            id={this.id}
         >
            {this.viewHTML()}
         </form>
      );
   }
}
