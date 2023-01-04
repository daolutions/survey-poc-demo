<script lang="ts">
  import { supabase } from '$lib/supabaseClient'
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import './styles.css'

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      invalidate('supabase:auth')
    })

    return () => {
      subscription.unsubscribe()
    }
  })
</script>

<div class="container">
  <slot />
</div>

<style>
  .container {
    padding: 50px 0 100px 0;
  }
</style>