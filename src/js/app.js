import $ from "dom7";
import Framework7 from "framework7/bundle";

// Import F7 Styles
import "framework7/css/bundle";

// Import Icons and App Custom Styles
import "../css/icons.css";
import "../css/app.less";

// Import Routes
import routes from "./routes.js";
// Import Store
import store from "./store.js";

// Import main app component
import App from "./views/app.f7.jsx";

// AB Factory
import AB from "./AppBuilder/ABFactory";

let version = "0.0.9";

var app = new Framework7({
   name: "AppBuilder PWA", // App name
   theme: "auto", // Automatic theme detection
   darkMode: "auto",
   colors: {
      primary: "#366989",
   },

   el: "#app", // App root element
   component: App, // App main component
   // App store
   store: store,
   // App routes
   routes: routes,
   version: version,

   // Register service worker (only on production build)
   serviceWorker:
      process.env.NODE_ENV === "production"
         ? {
              path: "/assets/html/pwa/service-worker.js",
           }
         : {},
});
