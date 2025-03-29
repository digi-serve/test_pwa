/**
 * ABMobileViewFormSelectSingle
 * The view that displays a list that can only have 1 selection.
 */

import ABMobileViewFormSelectSingleCore from "../../core/mobile/ABMobileViewFormSelectSingleCore.js";

export default class ABMobileViewFormSelectSingle extends ABMobileViewFormSelectSingleCore {
   constructor(...params) {
      super(...params);

      this.options = [
         /* {id, text} */
         // { id: 1, text: "one" },
         // { id: 2, text: "two" },
         // { id: 3, text: "three" },
      ];

      this.value = null;
   }

   async init() {
      this.options = [];
      await this.optionsLoad();
   }

   idState() {
      return this.id;
   }

   async optionsLoad() {
      let field = this.field();
      if (field) {
         // We can support different types of fields: Connections and Lists
         if (field.isConnection) {
            let options = await field.options();
            this.options = [];
            options.forEach((o) => {
               this.options.push({
                  id: o.id,
                  text: o.text,
                  value: field.getRelationValue(o),
               });
            });
            // let obj = field.datasourceLink;
            // if (obj) {
            //    let PK = obj.PK();
            //    let response = await obj.model().findAll();
            //    (response.data || []).forEach((d) => {
            //       this.options.push({
            //          id: d[PK],
            //          text: obj.displayData(d),
            //       });
            //    });
            // this.AB.$store.state[field.id] = this.options || []; // response.data || [];
            // }
            return;
         }

         // List fields:
         field.options().forEach((opt) => {
            // opt = { id, text, hex, translations }
            this.options.push({ id: opt.id, text: opt.text });
         });
      }
   }
   // setOptions(values, k = "id", t = "text") {
   //    this.options = [];
   //    (values || []).forEach((v) => {
   //       this.options.push({ id: v[k], text: v[t] });
   //    });
   // }
   valueClear() {
      const mySelect = this.myField;
      if (mySelect) {
         mySelect.selectedIndex = 0;
      }
      this.options.forEach((o) => {
         this.AB.$(`#${this.idOption(o)}`)?.prop("selected", "");
      });
   }

   valueLoad() {
      console.error("TODO: finish this");
   }

   setValue(vid) {
      this.value = vid;
   }

   idOption(o) {
      return `O${o.id.replaceAll(" ", "_")}`;
   }

   inputElement($h, item) {
      let $inputElement = $h`<option id=${this.idOption(item)} value=${
         item.value ?? item.id
      }>${item.text}</option>`;
      if (this.value == item.id) {
         $inputElement.props.selected = "";
      }
      return $inputElement;
   }

   html($h) {
      // NOTE: Async/$store lookups need to be initiated WITHIN the html()
      // action for Framework7 to register the UI to update once the data is
      // updated.
      let field = this.field();
      if (field.isConnection) {
         let myVal = this.AB.$store.getters[field.id]?.value;
      }

      return $h`
         <div class="item-content item-input">
            <div class="item-inner">
               <div class="item-title item-label">${field?.label}</div>
               <div class="item-input-wrap">
                  <select id=${this.idFormElement} name=${field?.columnName}>
                     ${this.options.map((item) => this.inputElement($h, item))}
                  </select>
               </div>
            </div>
         </div>
         `;
   }
}
