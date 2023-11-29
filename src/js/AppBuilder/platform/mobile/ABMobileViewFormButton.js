/**
 * ABMobileViewFormButton
 * The view that displays a row of form buttons.
 */

import ABMobileViewFormButtonCore from "../../core/mobile/ABMobileViewFormButtonCore.js";

export default class ABMobileViewFormButton extends ABMobileViewFormButtonCore {
   // constructor(...params) {
   //    super(...params);
   // }

   async init() {}

   cancel() {
      console.warn("TODO: Cancel this form.");
   }

   reset() {
      console.warn("TODO: Reset this form.");
   }

   save() {
      console.warn("TODO: SAVE this form");
   }

   buttonCancel($h) {
      if (!this.settings.includeCancel) return "";

      let label = this.settings.cancelLabel
         ? this.settings.cancelLabel
         : this.AB.Label()("Cancel");

      return $h`
         <a
            onClick=${() => this.cancel()}
            id=${this.id}
            class="button button-small button-fill button-preloader"
            href="#"
         >
            <span class="preloader"></span>
            <span>${label}</span>
         </a>
      `;
   }

   buttonReset($h) {
      if (!this.settings.includeReset) return "";

      let label = this.settings.resetLabel
         ? this.settings.resetLabel
         : this.AB.Label()("Reset");

      return $h`
         <a
            onClick=${() => this.reset()}
            id=${this.id}
            class="button button-large button-fill button-preloader"
            href="#"
         >
            <span class="preloader"></span>
            <span>${label}</span>
         </a>
      `;
   }

   buttonSave($h) {
      if (!this.settings.includeSave) return "";

      let label = this.settings.saveLabel
         ? this.settings.saveLabel
         : this.AB.Label()("Save");

      return $h`
         <a
            onClick=${() => this.save()}
            id=${this.id}
            class="button button-large button-fill button-preloader"
            href="#"
         >
            <span class="preloader"></span>
            <span>${label}</span>
         </a>
      `;
   }

   html($h) {
      return $h`
         <div class="block">
            ${this.buttonCancel($h)}
            ${this.buttonReset($h)}
            ${this.buttonSave($h)}
         </div>
      `;
   }
}
