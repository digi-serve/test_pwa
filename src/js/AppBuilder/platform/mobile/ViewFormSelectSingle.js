export default class ViewFormSelectSingle {
   constructor(AB, field, value = null) {
      this.AB = AB;
      this.field = field;

      this.options = [
         /* {id, text} */
         // { id: 1, text: "one" },
         // { id: 2, text: "two" },
         // { id: 3, text: "three" },
      ];

      this.value = value;
   }

   setOptions(values, k = "id", t = "text") {
      this.options = [];
      (values || []).forEach((v) => {
         this.options.push({ id: v[k], text: v[t] });
      });
   }

   setValue(vid) {
      this.value = vid;
   }

   inputElement($h, item) {
      let $inputElement = $h`<option value=${item.id}>${item.text}</option>`;
      if (this.value == item.id) {
         $inputElement.props.selected = "";
      }
      return $inputElement;
   }

   html($h) {
      return $h`
         <div class="item-content item-input">
            <div class="item-inner">
               <div class="item-title item-label">${this.field.label}</div>
               <div class="item-input-wrap">
                  <select name=${this.field.columnName}>
                     ${this.options.map((item) => this.inputElement($h, item))}
                  </select>
               </div>
            </div>
         </div>
         `;
   }
}
