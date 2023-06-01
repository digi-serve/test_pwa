export default (props, { $, $h, $f7, $on, $store, $update }) => {
   // Login screen demo data
   let path = document?.location?.pathname ? document.location.pathname : "/";
   let username = "";
   let password = "";
   let versionNumber = $f7.params.version;
   let showingUpdate = false;
   let isLoading = false;
   let apiUrl =
      process.env.NODE_ENV === "production"
         ? "https://design.digiserve.org/assets/html/pwa"
         : "http://localhost:8010/proxy/assets/html/pwa";

   $store.dispatch("getVersion");

   $on("pageInit", () => {
      checkForUpdate();
   });

   document.addEventListener("visibilitychange", (e) => {
      if (document.visibilityState == "visible") {
         checkForUpdate();
      }
   });

   const updatePassword = (e) => {
      password = $("#" + e).value();
      $update();
   };
   const alertLoginData = () => {
      $f7.dialog.alert(
         "Username: " + username + "<br/>Password: " + password,
         () => {
            $f7.loginScreen.close();
         }
      );
   };

   const close = (e) => {
      $f7.loginScreen.close("#my-login-screen");
   };

   const logout = () => {
      $f7.loginScreen.open("#my-login-screen");
      // $f7.preloader.show();
      // password = "";
      // $update();
      // fetchJson(Api.urls.logout, { method: 'GET' })
      //   .then(data => {
      //     store.dispatch('addCsrfToken', "");
      //     $f7.loginScreen.open("#my-login-screen");
      //     $f7.preloader.hide();
      //   })
      //   .catch(err => {
      //     console.error("logout failed but pretending it didn't");
      //     store.dispatch('addCsrfToken', "");
      //     $f7.loginScreen.open("#my-login-screen");
      //     $f7.preloader.hide();
      //   });
   };

   const authenticate = () => {
      isLoading = true;
      $update();
      let csrfToken = apiUrl + "/csrfToken";
      fetch(csrfToken, { method: "GET" })
         .then((csrfResponse) => {
            $store.dispatch("addCsrfToken", csrfResponse.json._csrf);
            let tempUser = $("#username").value();
            fetch(Api.urls.login, {
               method: "POST",
               body: JSON.stringify({
                  username: tempUser,
                  password,
               }),
            })
               .then(async (data) => {
                  $store.dispatch("getUser");
                  $store.dispatch("setUsername", $("#username").value());
                  $("#password")[0].value = "";
                  $f7.loginScreen.close();
                  isLoading = false;
                  $update();
               })
               .catch((err) => {
                  $f7.toast
                     .create({
                        icon: '<i class="material-icons">error</i>',
                        text: `Login Failed`,
                        position: "center",
                        closeTimeout: 2000,
                     })
                     .open();
                  isLoading = false;
                  $update();
               });
         })
         .catch((err) => {
            $f7.toast
               .create({
                  icon: '<i class="material-icons">error</i>',
                  text: `Login Failed`,
                  position: "center",
                  closeTimeout: 2000,
               })
               .open();
            isLoading = false;
            $update();
         });
   };

   const showPasswordPreview = (e) => {
      $("#passwordPreviewHolder").show();
      $("#passwordHolder").hide();
      $("#passwordPreview").focus();
   };

   const showPassword = (e) => {
      $("#passwordHolder").show();
      $("#passwordPreviewHolder").hide();
      $("#password").focus();
   };

   async function checkForUpdate() {
      if (!showingUpdate) {
         let getVersionPath = apiUrl + "/version.txt";

         const response = await fetch(getVersionPath, {
            method: "GET",
            cache: "no-cache",
         });
         const version = await response.text();
         console.log("getVersionPath: ", version);
         console.log("getCurrVersion: ", $f7.params.version);
         if ($f7.params.version.trim() != version.trim()) {
            showingUpdate = true;
            if ("serviceWorker" in navigator) {
               $f7.dialog
                  .create({
                     title: `Update Available`,
                     content: `There is an app update avaiable, tap "Update" to get the latest version.`,
                     buttons: [
                        {
                           text: "Cancel",
                           onClick: function (dialog, e) {
                              showingUpdate = false;
                           },
                        },
                        {
                           text: `Update to version {version}`,
                           bold: true,
                           cssClass: "bg-color-primary text-color-white",
                           onClick: function (dialog, e) {
                              $f7.progressbar.show();
                              navigator.serviceWorker
                                 .getRegistrations()
                                 .then(function (registrations) {
                                    let complete = registrations.length;
                                    let index = 0;
                                    for (let registration of registrations) {
                                       registration
                                          .unregister()
                                          .then((boolean) => {
                                             index++;
                                             if (index == complete) {
                                                showingUpdate = false;
                                                window.location.reload(true);
                                             }
                                          });
                                    }
                                    if (complete == 0) {
                                       showingUpdate = false;
                                       window.location.reload(true);
                                    }
                                 });
                           },
                        },
                     ],
                     verticalButtons: true,
                  })
                  .open();
            }
         } else {
            // alert("up to date");
         }
      }
   }

   return () => (
      <div id="app">
         {/* Left panel with cover effect */}
         <div class="panel panel-left panel-cover dark panel-init">
            <div class="view">
               <div class="page bg-color-primary">
                  <div class="navbar">
                     <div class="navbar-bg"></div>
                     <div class="navbar-inner">
                        <div class="title">AppBuilder PWA</div>
                     </div>
                  </div>
                  <div class="page-content">
                     <div class="block text-align-center no-margin-bottom">
                        {/* block content */}
                        <img
                           src="images/digiServe_logo.png"
                           width="70%"
                           class="sidebar_logo"
                        />
                        <p></p>
                     </div>
                     <div class="list list-outline list-strong list-dividers list-translucent">
                        <ul>
                           <li>
                              <a
                                 href="/"
                                 class="item-link item-content panel-close"
                              >
                                 <div class="item-media">
                                    <i class="material-icons">contacts</i>
                                 </div>
                                 <div class="item-inner">
                                    <div class="item-title">List of People</div>
                                 </div>
                              </a>
                           </li>
                           <li>
                              <a
                                 href="#"
                                 class="item-link item-content"
                                 onClick={() => logout()}
                              >
                                 <div class="item-media">
                                    <i class="material-icons">logout</i>
                                 </div>
                                 <div class="item-inner">
                                    <div class="item-title">Log out</div>
                                 </div>
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div
                        class="block text-align-center"
                        style="position: absolute; width: 100%; margin-bottom: 15px; bottom: 0px;"
                     >
                        <p>
                           <img src="images/digiServe_logo.png" width="30%" />
                           <br />
                           <span class="version">v{versionNumber}</span>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Your main view, should have "view-main" class */}
         <div class="view view-main view-init safe-areas" data-url={path}></div>

         {/* Login Screen */}
         <div class="login-screen" id="my-login-screen">
            <div class="view">
               <div class="page bg-color-primary dark">
                  <div class="page-content login-screen-content bg-color-primary">
                     <div class="block text-align-center no-margin-bottom">
                        <img
                           src="images/digiServe_logo.png"
                           width="60%"
                           class="sidebar_logo"
                        />
                     </div>
                     <form
                        action="javascript: null;"
                        onSubmit={() => authenticate()}
                     >
                        <div class="list">
                           <ul>
                              <li class="item-content item-input">
                                 <div class="item-inner">
                                    <div class="item-title item-label">
                                       Username
                                    </div>
                                    <div class="item-input-wrap">
                                       <input
                                          autocorrect="off"
                                          autocomplete="username"
                                          spellcheck="false"
                                          type="text"
                                          id="username"
                                          name="username"
                                          placeholder="Your username"
                                       />
                                       <span class="input-clear-button"></span>
                                    </div>
                                 </div>
                              </li>
                              <li
                                 id="passwordHolder"
                                 class="item-content item-input"
                              >
                                 <div class="item-inner">
                                    <div class="item-title item-label">
                                       Password
                                    </div>
                                    <div class="item-input-wrap">
                                       <a
                                          onClick={() => showPasswordPreview()}
                                          style="color: var(--f7-input-clear-button-color); position: absolute; right: 0; padding: 10px; margin-right: -15px; margin-top: -5px;"
                                          href="#"
                                       >
                                          <i class="material-icons">
                                             visibility_off
                                          </i>
                                       </a>
                                       <input
                                          required
                                          type="password"
                                          id="password"
                                          name="password"
                                          placeholder="Your password"
                                          value={password}
                                          onInput={() =>
                                             updatePassword("password")
                                          }
                                          autocomplete="current-password"
                                          autocorrect="off"
                                          spellcheck="false"
                                       />
                                    </div>
                                 </div>
                              </li>
                              <li
                                 id="passwordPreviewHolder"
                                 style="display: none;"
                                 class="item-content item-input"
                              >
                                 <div class="item-inner">
                                    <div class="item-title item-label">
                                       Password
                                    </div>
                                    <div class="item-input-wrap">
                                       <a
                                          onClick={() => showPassword()}
                                          style="color: var(--f7-input-clear-button-color); position: absolute; right: 0; padding: 10px; margin-right: -15px; margin-top: -5px;"
                                          href="#"
                                       >
                                          <i class="material-icons">
                                             visibility
                                          </i>
                                       </a>
                                       <input
                                          required
                                          type="text"
                                          id="passwordPreview"
                                          name="passwordPreview"
                                          placeholder="Your password"
                                          value={password}
                                          onInput={() =>
                                             updatePassword("passwordPreview")
                                          }
                                          autocomplete="current-password"
                                          autocorrect="off"
                                          spellcheck="false"
                                       />
                                    </div>
                                 </div>
                              </li>
                              <li class="item-content item-input"></li>
                           </ul>
                        </div>
                        <div class="block">
                           <button class="button color-primary button-outline button-round bg-color-white button-large login-button button-preloader">
                              <div class="preloader">
                                 <span class="preloader-inner">
                                    <span class="if-ios">
                                       <span class="preloader-inner-line"></span>
                                       <span class="preloader-inner-line"></span>
                                       <span class="preloader-inner-line"></span>
                                       <span class="preloader-inner-line"></span>
                                       <span class="preloader-inner-line"></span>
                                       <span class="preloader-inner-line"></span>
                                       <span class="preloader-inner-line"></span>
                                       <span class="preloader-inner-line"></span>
                                    </span>
                                    <span class="if-md">
                                       <svg viewBox="0 0 36 36">
                                          <circle
                                             cx="18"
                                             cy="18"
                                             r="16"
                                          ></circle>
                                       </svg>
                                    </span>
                                    <span class="if-aurora">
                                       <span class="preloader-inner-circle"></span>
                                    </span>
                                 </span>
                              </div>
                              <span>Sign In</span>
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
