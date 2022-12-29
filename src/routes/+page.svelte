<script>
  import { page } from '$app/stores'
  import Auth from './Auth.svelte'

  //console.log('session', $page.data.session)
</script>

<svelte:head>
  <title>Supabase + SvelteKit</title>
  <meta name="description" content="SvelteKit using supabase-js v2" />
</svelte:head>

{#if !$page.data.session}
<Auth />
{:else}
  <h1>Done</h1>
  <p>{$page.data.session}</p>
{/if}