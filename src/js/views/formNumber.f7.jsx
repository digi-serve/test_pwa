import formItem from "./formItem.f7.jsx";

export default class F7ViewFormNumber extends formItem {
   #AB;
   #form;
   constructor(AB, form, definition) {
      super(definition);

      this.#AB = AB;
      this.#form = form;
   }

   html() {
      const definition = this.definition;
      const errorMessage = this.#AB.Label("Only numbers please!");

      return () => (
         <div class="item-content item-input">
            <div class="item-inner">
               <div class="item-title item-label">{definition.label}</div>
               <div class="item-input-wrap">
                  <div class="range-slider range-slider-init" data-label="true">
                     {definition.settings.required === 1 ? (
                        <input
                           name={definition.field}
                           type="range"
                           value="50"
                           min="0"
                           max="100"
                           step="1"
                           required
                           validate
                           pattern="[0-9]*"
                           data-error-message={errorMessage}
                        />
                     ) : (
                        <input
                           name={definition.field}
                           type="range"
                           value="50"
                           min="0"
                           max="100"
                           step="1"
                           pattern="[0-9]*"
                           data-error-message={errorMessage}
                        />
                     )}
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
