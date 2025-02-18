/**
 * ABMobileViewCustom
 * This view allows a developer to create a custom view for their mobile app.
 */

import ABMobileViewCustomCore from "../../core/mobile/ABMobileViewCustomCore.js";

export default class ABMobileViewCustom extends ABMobileViewCustomCore {
   constructor(...params) {
      super(...params);

      // now make sure our custom init() and html() methods are defined
      if (this.settings.initCode) {
         this._init = new Function(
            "$AB",
            "$DC",
            `return (async () => { ${this.settings.initCode} })()`
         );
      } else {
         this._init = new Function(
            "$AB",
            "$DC",
            `return (async () => { console.log("no initCode provided."); })()`
         );
      }

      if (this.settings.htmlCode) {
         this._html = new Function(
            "$AB",
            "$h",
            "$DC",
            `return (() => { ${this.settings.htmlCode} })()`
         );
      } else {
         this._html = new Function(
            "$AB",
            "$h",
            "$DC",
            `return $h\`<b>${this.label}: No HTML code provided.</b>\`;`
         );
      }

      this.$DC = {};
      Object.keys(this.settings.datacollections ?? {}).forEach((label) => {
         let id = this.settings.datacollections[label];
         let dc = this.AB.datacollectionByID(id);
         this.$DC[label] = dc;
      });
   }

   async init() {
      // Call the custom init function if it exists
      if (this._init) {
         await this._init(this.AB, this.$DC);
      }
   }

   html($h) {
      // Call the custom html function if it exists
      if (this._html) {
         return () => $h`${this._html(this.AB, $h, this.$DC)}`;
      }
   }
}
