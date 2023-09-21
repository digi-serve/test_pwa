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
                  <div class="title">{L("Not found")}</div>
               </div>
            </div>
            <div class="page-content">
               <div class="block block-strong inset">
                  <center>
                     <h1>{L("Sorry")}</h1>
                     <p>{L("Requested content not found.")}</p>
                  </center>
               </div>
            </div>
         </div>
      );
   };
};
