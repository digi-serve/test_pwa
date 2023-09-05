export default (AB) => {
   return (props, { $, $h, $f7, $on, $store, $update }) => {
      return () => (
         <div class="page">
            <div class="navbar">
               <div class="navbar-bg"></div>
               <div class="navbar-inner sliding">
                  <div class="left">
                     <a href="#" class="link back">
                        <i class="icon icon-back"></i>
                        <span class="if-not-md">Back</span>
                     </a>
                  </div>
                  <div class="title">Not found</div>
               </div>
            </div>
            <div class="page-content">
               <div class="block block-strong inset">
                  <center>
                     <h1>Sorry</h1>
                     <p>Requested content not found.</p>
                  </center>
               </div>
            </div>
         </div>
      );
   };
};
