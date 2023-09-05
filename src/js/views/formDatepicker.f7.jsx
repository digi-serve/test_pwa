import formItem from "./formItem.f7.jsx";

export default class F7ViewFormDatepicker extends formItem {
   #AB;
   #form;
   constructor(AB, form, definition) {
      super(definition);

      this.#AB = AB;
      this.#form = form;
   }

   viewHTML() {
      const definition = this.definition;

      switch (definition.fieldType) {
         case "datetime":
            return definition.settings.required === 1 ? (
               <input
                  type="text"
                  name={definition.field}
                  class="form-datepicker-datetime"
                  placeholder={definition.placeholder}
                  readonly="readonly"
                  required
                  validate
               />
            ) : (
               <input
                  type="text"
                  name={definition.field}
                  class="form-datepicker-datetime"
                  placeholder={definition.placeholder}
                  readonly="readonly"
               />
            );

         default:
            return definition.settings.required === 1 ? (
               <input
                  type="text"
                  name={definition.field}
                  class="form-datepicker-date"
                  placeholder={definition.placeholder}
                  readonly="readonly"
                  required
                  validate
               />
            ) : (
               <input
                  type="text"
                  name={definition.field}
                  class="form-datepicker-date"
                  placeholder={definition.placeholder}
                  readonly="readonly"
               />
            );
      }
   }

   html() {
      return () => (
         <div class="item-content item-input">
            <div class="item-inner">
               <div class="item-title item-label">{this.definition.label}</div>
               <div class="item-input-wrap">{this.viewHTML()}</div>
            </div>
         </div>
      );
   }
}
