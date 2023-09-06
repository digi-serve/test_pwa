import formItem from "./formItem.f7.jsx";

export default class F7ViewFormButton extends formItem {
   #AB;
   #form;
   constructor(AB, form, definition) {
      super(definition);

      this.#AB = AB;
      this.#form = form;
   }

   async #save() {
      const ab = this.#AB;
      const form = this.#form;
      const definition = this.definition;

      ab.$(`#${definition.id}`).addClass("button-loading");

      const formData = ab.$f7.form.convertToData(`#${form.id}`);

      if (!ab.$f7.input.validateInputs(`#${form.id}`)) {
         ab.$(`#${definition.id}`).removeClass("button-loading");

         return;
      }

      const parsedFormData = {};

      form.views.forEach((view) => {
         const field = view.definition.field;

         switch (view.definition.fieldType) {
            case "boolean":
               if (formData[field].length === 0) {
                  parsedFormData[field] = 0;

                  break;
               }

               parsedFormData[field] = 1;

               break;

            case "date":
            case "datetime":
               parsedFormData[field] = new Date(formData[field]);

               break;

            case "number":
               parsedFormData[field] = parseInt(formData[field]);

               break;

            default:
               parsedFormData[field] = formData[field];

               break;
         }
      });

      const dc = form.datacollection;

      try {
         if (form.record == null) await dc.model.create(parsedFormData);
         else
            await dc.model.update(
               form.record[dc.datasource.PK()],
               parsedFormData
            );

         // on success, go back to list page
         ab.$f7.views.current.router.back();
      } catch (e) {
         console.error(e);

         // TODO: popup here:
         const L = ab.Label();

         let text = L("Save Failed");

         // @TODO: instead of stuffing errors into popup message, find the input controls
         // and set them to invalid markers, and add the message to them if possible.

         if (e.errors) {
            try {
               if ("string" == typeof e.errors) e.errors = JSON.parse(e.errors);
            } catch (e) {
               // ignore
            }

            (e.errors || []).forEach((valError) => {
               text = `${text}<br>${valError.name}: ${valError.message}`;
            });
         }

         ab.$f7.toast
            .create({
               icon: '<i class="material-icons">error</i>',
               text,
               position: "center",
               closeTimeout: 2000,
            })
            .open();
      }

      ab.$(`#${definition.id}`).removeClass("button-loading");

      // this.$store.dispatch("updateRecord", {
      //    dcID: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
      //    recordID: form.record.uuid,
      //    record: parsedFormData,
      // });
      // setTimeout(() => {
      //    this.$("#" + btn).removeClass("button-loading");
      // }, 1000);
   }

   html() {
      const definition = this.definition;

      return () => (
         <div class="block">
            <a
               onClick={() => this.#save()}
               id={definition.id}
               class="button button-large button-fill button-preloader"
               href="#"
            >
               <span class="preloader"></span>
               <span>{definition.label}</span>
            </a>
         </div>
      );
   }
}
