import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  // resolve: {
  //   alias: [
  //     {find: /^keycloak-js\//, replacement: '/node_modules/keycloak-js/'}
  //   ]
  // },
	plugins: [sveltekit()]
};

export default config;
