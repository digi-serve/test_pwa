import formItem from "./formItem.f7.jsx";

export default class F7ViewFormTextbox extends formItem {
   #AB;
   #form;
   constructor(AB, form, definition) {
      super(definition);

      this.#AB = AB;
      this.#form = form;
   }

   html() {
      const definition = this.definition;

      let $inputElement = "";

      switch (definition.fieldType) {
         case "LongText":
            $inputElement =
               definition.settings.required === 1 ? (
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
               );

            break;

         case "email":
            $inputElement =
               definition.settings.required === 1 ? (
                  <input
                     type="email"
                     name={definition.field}
                     placeholder={definition.placeholder}
                     required
                     validate
                  ></input>
               ) : (
                  <input
                     type="email"
                     name={definition.field}
                     placeholder={definition.placeholder}
                     required
                     validate
                  ></input>
               );

            break;

         default:
            $inputElement =
               definition.settings.required === 1 ? (
                  <input
                     name={definition.field}
                     type="text"
                     placeholder={definition.placeholder}
                     required
                     validate
                  />
               ) : (
                  <input
                     name={definition.field}
                     type="text"
                     placeholder={definition.placeholder}
                  />
               );

            break;
      }

      return () => (
         <div class="item-content item-input">
            <div class="item-inner">
               <div class="item-title item-label">{definition.label}</div>
               <div class="item-input-wrap">{$inputElement}</div>
            </div>
         </div>
      );
   }
}
