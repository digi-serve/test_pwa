import formItem from "./formItem.f7.jsx";

export default class F7ViewFormJSON extends formItem {
   #AB;
   #form;
   constructor(AB, form, definition) {
      super(definition);

      this.#AB = AB;
      this.#form = form;
   }

   parseFormData(value) {
      const AB = this.#AB;
      const $inputElements = AB.$(`#${this.#form.id}`).find(
         `textarea[name="${this.definition.field}"]`
      );

      try {
         $inputElements[0].setCustomValidity("");
         JSON.parse(value);
      } catch (err) {
         $inputElements[0].setCustomValidity(AB.Label()("Invalid JSON!"));
         $inputElements[0].checkValidity();
      }

      return super.parseFormData(value);
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
