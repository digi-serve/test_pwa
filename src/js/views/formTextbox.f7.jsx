export default class F7ViewFormTextbox {
   constructor(view, allDCs, $f7, $store) {
      this.view = view;
      this.allDCs = allDCs;
      this.$f7 = $f7;
      this.$store = $store;
   }

   getType() {
      switch (this.view.key) {
         case "email":
            return "email";
         case "text":
            return "text";
            break;
         default:
         // code block
      }
   }

   html() {
      return () => (
         <li>
            <div class="item-content item-input">
               <div class="item-inner">
                  <div class="item-title item-label">{this.view.label}</div>
                  <div class="item-input-wrap">
                     <input
                        name={this.view.field}
                        type={this.getType()}
                        placeholder={this.view.placeholder}
                     />
                  </div>
               </div>
            </div>
         </li>
      );
   }
}
