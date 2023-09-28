export default (AB) => {
   const init = async () => {
      if (!AB.isInitialized) {
         try {
            const user = await AB.Network.get({ url: "/mobile/whoami" });

            AB.isInitialized = true;
            AB.$f7.view.main.router.navigate("/list", {
               transition: "f7-fade",
            });
         } catch (e) {
            // NOTE: this will catch errors OTHER than the "Reauth" notification
            // errors.  Those will be caught by listening to the AB.Network object
            AB.$f7.loginScreen.open("#my-login-screen");
         }
      } else {
         console.warn("Why is page(/).onPageInit() still getting called?");
      }
   };

   return (props, { $, $h, $f7, $on, $store, $update }) => {
      AB.$ = $;
      AB.$f7 = $f7;
      AB.$store = $store;

      $on("pageInit", async (e, page) => {
         // var panel = $f7.panel.get(".panel-left");
         // panel.open();
         await init();
      });

      return () => (
         <div class="page">
            <div class="block no-margin text-align-center vertical-container">
               <div class="preloader vertical-center"></div>
            </div>
         </div>
      );
   };
};
