<script>
  import IconButton from '@smui/icon-button';
  import { tick } from 'svelte';

  export let action
  export let name
  export let value
  export let placeholder = 'no entry'
  let editable = false

  let actionForm
  let newValue

  async function doAction() {
    editable = false
    if (document?.getElementById(action+'-'+name)){
      newValue = document.getElementById(action+'-'+name).innerText
      if (newValue !== value) {
        console.log('saving action', newValue)
        await tick()
        actionForm.submit()
      }
    }
  }

  $: if (editable) {
    const elem = document.getElementById(action+'-'+name)
    tick().then(() => {
      elem.focus()
      window.getSelection().selectAllChildren(elem);
    });
  } 

</script>

<form method="POST" action="?/{action}" bind:this={actionForm}>
  <input type="hidden" name={name} bind:value={newValue} />
  <span id="{action}-{name}" contenteditable={editable} on:blur={doAction}>
	  {value || placeholder}
  </span>
  {#if !editable}
    <IconButton class="material-icons" on:click={() => {editable = true}} ripple={false} size="button">edit</IconButton>
  {:else}
    <IconButton class="material-icons" on:click={doAction} ripple={false} size="button">save</IconButton>
  {/if}
</form>

<style>
  form {
    display: inline;
  }
</style>