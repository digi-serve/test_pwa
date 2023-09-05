import formItem from "./formItem.f7.jsx";

export default class F7ViewFormReadonly extends formItem {
   #AB;
   #form;
   constructor(AB, form, definition) {
      super(definition);

      this.#AB = AB;
      this.#form = form;
   }

   html() {
      return () => {};
   }
}
