import formItem from "./formItem.f7.jsx";

export default class F7ViewFormConnect extends formItem {
   #AB;
   #form;
   constructor(AB, form, definition) {
      super(definition);

      this.#AB = AB;
      this.#form = form;
   }

   html() {
      const connectedType = "selectsingle" || "selectmultiple";

      return () => {};
   }
}
