import formItem from "./formItem.f7.jsx";

export default class F7ViewFormCheckbox extends formItem {
   #AB;
   #form;
   constructor(AB, form, definition) {
      super(definition);

      this.#AB = AB;
      this.#form = form;
   }

   html() {
      const definition = this.definition;

      return () => (
         <div class="item-content">
            <div class="item-inner">
               <div class="item-title">{definition.label}</div>
               <div class="item-after">
                  <label class="toggle toggle-init">
                     <input name={definition.field} type="checkbox" />
                     <i class="toggle-icon"></i>
                  </label>
               </div>
            </div>
         </div>
      );
   }
}
