/**
 * ABMobileViewLabel
 * The view that displays a label on the screen.
 */

import ABMobileViewLabelCore from "../../core/mobile/ABMobileViewLabelCore.js";

export default class ABMobileViewLabel extends ABMobileViewLabelCore {
   // constructor(...params) {
   //    super(...params);
   // }

   async init() {}

   get style() {
      let style = "";
      switch (this.settings.format) {
         case 0:
         case "0": // normal
            style = "";
            break;

         case 1:
         case "1": // title
            style = "title-large-text";
            break;

         case 2:
         case "2": // description
            style = "description";
            break;
      }
      return style;
   }

   get alignment() {
      let align = "";
      switch (this.settings.alignment) {
         case "left":
            align = "text-align-left";
            break;

         case "right":
            align = "text-align-right";
            break;

         case "center":
            align = "text-align-center";
            break;
      }
      return align;
   }

   html($h) {
      return () =>
         $h`<div class="${this.style} ${this.alignment}">${this.text}</div>`;
   }
}
