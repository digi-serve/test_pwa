import NotFoundPage from "../pages/404.f7.jsx";
import FormPage from "../pages/form.f7.jsx";
import HomePage from "../pages/home.f7.jsx";
import ListPage from "../pages/list.f7.jsx";

export default (AB) => {
   const Application = AB.applications()[0]; // AB.applicationByID("4b7a489a-5fe5-4044-8565-aaa3654300f2");

   AB.isInitialized = false;

   AB.Network.on("reauth", () => {
      AB.isInitialized = false;
      AB.$f7.loginScreen.open("#my-login-screen");
   });

   const routes = [
      {
         path: "/",
         component: HomePage(AB),
      },
      {
         path: "/form",
         component: FormPage(AB),
      },
      {
         path: "/list",
         component: ListPage(AB),
      },
      {
         path: "(.*)",
         component: NotFoundPage(AB),
      },
   ];

   const listPages = Application.pages();

   listPages.forEach((Page) => {
      routes.push(Page.routeComponent());
   });

   // Now add the final NotFoundPage for all other references:
   routes.push({
      path: "(.*)",
      component: NotFoundPage(AB),
   });

   return routes;
};
