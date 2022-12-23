/** @type {import('@sveltejs/kit').Handle} */
//import Keycloak from "keycloak-js";

export async function handle({ event, resolve }) {
  
//  let instance = {
//     url: "https://my-test.create.at/auth",
//     realm: "demo",
//     clientId: "pwa",
//   };
//   let keycloak = Keycloak(instance);
//   let initOptions = { onLoad: "login-required" };
//   keycloak
//     .init(initOptions)
//     .then(function (authenticated) {
//       console.info("Authenticated");
//     })
//     .catch(function () {
//       keycloak.login(); 
//       alert("failed to initialize");
//     });

  const response = await resolve(event);
  
 
  return response;
}