import ABMobileViewFormReadonlyCore from "../../core/mobile/ABMobileViewFormReadonlyCore";

export default class ABMobileViewFormReadonly extends ABMobileViewFormReadonlyCore {
   html($h) {
      let field = this.field();
      return $h`
         <div class="item-content item-input">
            <div class="item-inner">
               <div class="item-title item-label">${this.label}</div>
               <div class="item-input-wrap">
                  <input
                     name=${field.columnName}
                     type="text"
                     disabled="disabled"
                  />
               </div>
            </div>
         </div>
      `;
   }
}
