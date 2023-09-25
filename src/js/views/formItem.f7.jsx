export default class F7ViewFormItem {
   #definition;
   constructor(definition) {
      // definition.*
      // .id {uuid} the ID of our ABViewForm*.
      // .key {string} the key of ABViewForm*.
      // .field {string} the input.name of the form element that contains this value.
      // .fieldType {string} The keys of ABField*. So, some field types reuse the same form component views. We can classify this.
      // .placeholder {string} the default display if no value is set.
      // .label {string} the label for this component.
      // .settings {object} the same default settings of ABFied*Core in ABDesigner.
      this.#definition = definition;
   }

   get definition() {
      return this.#definition;
   }

   parseFormData(value) {
      return value;
   }

   html() {
      return () => {};
   }
}
