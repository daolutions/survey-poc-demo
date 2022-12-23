<script>
  import { browser, building, dev, version } from '$app/environment';
  import Keycloak from "keycloak-js";
  import { onMount } from 'svelte';

  export const ssr = false;

   let instance = {
    url: "https://my-test.create.at/auth",
    realm: "demo",
    clientId: "pwa",
  };
  
  onMount(async () => {
    if (browser) {
      let k = Keycloak(instance);
      console.log(k)
      let initOptions = { onLoad: "login-required" };
      k
        .init(initOptions)
        .then(function (authenticated) {
          console.info("Authenticated");
        })
        .catch(function () {
          k.login(); 
          alert("failed to initialize");
        });
    }

	});
  
</script>

<svelte:window></svelte:window>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
