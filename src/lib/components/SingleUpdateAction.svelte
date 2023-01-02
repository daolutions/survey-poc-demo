<script>
  import IconButton from '@smui/icon-button';
  import { tick } from 'svelte';

  export let action
  export let id = ''
  export let name
  export let value
  export let placeholder = 'no entry'
  let editable = false

  let actionForm
  let newValue

  async function doAction() {
    editable = false
    if (document?.getElementById(action+'-'+name+'-'+id)){
      newValue = document.getElementById(action+'-'+name+'-'+id).innerText
      if (newValue !== value) {
        console.log('saving action', newValue)
        await tick()
        actionForm.submit()
      }
    }
  }

  $: if (editable) {
    const elem = document.getElementById(action+'-'+name+'-'+id)
    tick().then(() => {
      elem.focus()
      window.getSelection().selectAllChildren(elem);
    });
  } 

  function handleKeydown(event) {
		if(event.key === 'Escape') {
      editable = false
    } else if (event.key === 'Enter') {
      doAction()
    }
	}

</script>

<svelte:window on:keydown={handleKeydown}/>

<form method="POST" action="?/{action}" bind:this={actionForm}>
  <input type="hidden" name={name} bind:value={newValue} />
  <input type="hidden" name="id" value={id} />
  <span id="{action}-{name}-{id}" contenteditable={editable} on:blur={doAction}>
	  {value || placeholder}
  </span>
  {#if !editable}
    <IconButton class="material-icons" on:click={(e) => {e.stopPropagation(); editable = true}} ripple={false} size="button">edit</IconButton>
  {:else}
    <IconButton class="material-icons" on:click={(e) => {e.stopPropagation(); doAction()}} ripple={false} size="button">save</IconButton>
  {/if}
</form>

<style>
  form {
    display: inline;
  }
</style>