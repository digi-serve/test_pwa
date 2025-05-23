export default (AB) => {
   const L = AB.Label();
   return () => {
      return () => (
         <div class="page">
            <div class="navbar">
               <div class="navbar-bg"></div>
               <div class="navbar-inner sliding">
                  <div class="left">
                     <a href="#" class="link back">
                        <i class="icon icon-back"></i>
                        <span class="if-not-md">{L("Back")}</span>
                     </a>
                  </div>
                  <div class="title">{L("Inbox Item")}</div>
               </div>
            </div>
            <div class="page-content">
               <p>Message</p>
            </div>
         </div>
      );
   };
};
