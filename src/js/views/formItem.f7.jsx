export default class F7ViewFormItem {
   #definition;
   constructor(definition) {
      this.#definition = definition;
   }

   get definition() {
      return this.#definition;
   }

   html() {
      return () => {};
   }
}
