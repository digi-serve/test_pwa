import formItem from "./formItem.f7.jsx";
import formSelectMultiple from "./formSelectMultiple.f7.jsx";
import formSelectSingle from "./formSelectSingle.f7.jsx";

export default class F7ViewFormConnect extends formItem {
   #AB;
   #form;
   constructor(AB, form, definition) {
      super(definition);

      this.#AB = AB;
      this.#form = form;
   }

   parseFormData(value) {
      if (this.definition.settings.linkType === "many")
         return this.#AB
            .$(`#${this.#form.id}`)
            .find(`select[name="${this.definition.field}"]`)
            .val();

      return super.parseFormData(value);
   }

   html() {
      const definition = this.definition;
      const definitionCopy = Object.assign({}, definition, {
         settings: Object.assign(
            {
               options: [], // conected object's records,
            },
            definition.settings
         ),
      });

      const formComponent =
         definition.settings.linkType !== "one"
            ? new formSelectSingle(this.#AB, this.#form, definitionCopy)
            : new formSelectMultiple(this.#AB, this.#form, definitionCopy);

      return formComponent.html();
   }
}
