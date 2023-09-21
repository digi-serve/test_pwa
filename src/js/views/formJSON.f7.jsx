import formItem from "./formItem.f7.jsx";

export default class F7ViewFormJSON extends formItem {
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
                  {definition.settings.required === 1 ? (
                     <textarea
                        name={definition.field}
                        placeholder={definition.placeholder}
                        class="resizable"
                        required
                        validate
                     ></textarea>
                  ) : (
                     <textarea
                        name={definition.field}
                        placeholder={definition.placeholder}
                        class="resizable"
                     ></textarea>
                  )}
               </div>
            </div>
         </div>
      );
   }
}
