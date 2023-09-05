import formItem from "./formItem.f7.jsx";

export default class F7ViewFormSelectSingle extends formItem {
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
         <div class="item-content item-input">
            <div class="item-inner">
               <div class="item-title item-label">{definition.label}</div>
               <div class="item-input-wrap">
                  <select name={definition.field}>
                     {definition.settings.options.map((item) => (
                        <option value={item.id}>{item.text}</option>
                     ))}
                  </select>
               </div>
            </div>
         </div>
      );
   }
}
