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
      const AB = this.#AB;
      const form = this.#form;
      const definition = this.definition;

      AB.$(`#${definition.id}`).addClass("button-loading");

      const formData = AB.$f7.form.convertToData(`#${form.id}`);

      const parsedFormData = {};

      form.views.forEach((view) => {
         const field = view.definition.field;

         parsedFormData[field] = view.parseFormData(formData[field]);
      });

      if (!AB.$f7.input.validateInputs(`#${form.id}`)) {
         AB.$(`#${definition.id}`).removeClass("button-loading");

         return;
      }

      const dc = form.datacollection;

      try {
         if (form.record == null) await dc.model.create(parsedFormData);
         else
            await dc.model.update(
               form.record[dc.datasource.PK()],
               parsedFormData
            );

         if (definition.afterSubmitView == null) {
            AB.$f7.views.current.router.back();

            return;
         }

         const afterSubmitView = this.application.pageByID(
            definition.afterSubmitView.id
         );

         afterSubmitView.openView(definition.afterSubmitView.props);
      } catch (e) {
         console.error(e);

         // TODO: popup here:
         const L = AB.Label();

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

         AB.$f7.toast
            .create({
               icon: '<i class="material-icons">error</i>',
               text,
               position: "center",
               closeTimeout: 2000,
            })
            .open();
      }

      AB.$(`#${definition.id}`).removeClass("button-loading");
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
