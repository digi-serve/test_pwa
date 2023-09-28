import formItem from "./formItem.f7.jsx";

export default class F7ViewFormSelectMultiple extends formItem {
   #AB;
   #form;
   constructor(AB, form, definition) {
      super(definition);

      this.#AB = AB;
      this.#form = form;
   }

   parseFormData(value) {
      return this.#AB
         .$(`#${this.#form.id}`)
         .find(`select[name="${this.definition.field}"]`)
         .val();
   }

   html() {
      const definition = this.definition;

      return () => (
         <a href="#" class="item-link smart-select smart-select-init">
            <select
               name={definition.name}
               placeholder={definition.placeholder}
               multiple
            >
               {definition.settings.options.map((item) => (
                  <option value={item.id}>{item.text}</option>
               ))}
            </select>
            <div class="item-content">
               <div class="item-inner">
                  <div class="item-title">{definition.label}</div>
                  <div class="item-after"></div>
               </div>
            </div>
         </a>
      );
   }
}
