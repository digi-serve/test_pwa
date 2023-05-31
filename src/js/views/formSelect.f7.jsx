export default class F7ViewFormSelect {
   constructor(view, allDCs, $f7, $store, record) {
      this.view = view;
      this.allDCs = allDCs;
      this.$f7 = $f7;
      this.$store = $store;
      this.options = [
         { id: "Male", text: "Male" },
         { id: "Female", text: "Female" },
      ];
      this.record = record;
   }

   getType() {
      switch (this.view.key) {
         case "selectsingle":
            return false;
         case "selectmultiple":
            return true;
            break;
         default:
         // code block
      }
   }

   // isSelected(item) {
   //    if (item.id == this.record[])
   // }

   html() {
      return () => (
         <li>
            <a href="#" class="item-link smart-select smart-select-init">
               <select
                  name={this.view.name}
                  placeholder={this.view.placeholder}
                  multiple={this.getType()}
               >
                  {this.options.map((item) => (
                     <option value={item.id}>{item.text}</option>
                  ))}
               </select>
               <div class="item-content">
                  <div class="item-inner">
                     <div class="item-title">{this.view.label}</div>
                     <div class="item-after"></div>
                  </div>
               </div>
            </a>
         </li>
      );
   }
}
