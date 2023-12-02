import ViewFormSelectSingle from "./ViewFormSelectSingle";

export default class ViewFormSelectMultiple extends ViewFormSelectSingle {
   html($h) {
      let value = this.options.find((o) => o.id == this.value)?.text;
      return $h`
         <a href="#" class="item-link smart-select smart-select-init">
            <select
               name=${this.field.columnName}
               multiple
            >
               ${this.options.map((item) => this.inputElement($h, item))}
            </select>
            <div class="item-content">
               <div class="item-inner">
                  <div class="item-title">${this.field.label}</div>
                  <div class="item-after">${value || "Value"}</div>
               </div>
            </div>
         </a>
         `;
   }
}
