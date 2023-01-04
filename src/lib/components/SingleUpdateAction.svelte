<script>
  import IconButton from '@smui/icon-button';
  import { tick } from 'svelte';

  export let action
  export let id = ''
  export let name
  export let value
  export let placeholder = 'no entry'

  let elem
  let editable = false

  let actionForm
  let newValue

  async function doAction(e) {
    if(e.relatedTarget || e.key === 'Enter'){
      console.log('doAction', e)
      if (elem){
        newValue = elem.innerText
        if (newValue !== value) {
          console.log('saving action', newValue)
          await tick()
          actionForm.submit()
        }
      }
    } else if(editable && e.key !== 'Enter') {
      console.log('HALLO', e)
      elem.innerText = value
    }
    editable = false
  }

  $: if (editable) {
    tick().then(() => {
      elem.focus()
      window.getSelection().selectAllChildren(elem);
    });
  } 

  function handleKeydown(event) {
		if(event.key === 'Escape') {
      event.stopPropagation();
      event.preventDefault();
      editable = false
      elem.innerText = value
    } else if (event.key === 'Enter' && editable) {
      event.preventDefault();
      console.log('enter', event)
      doAction(event)
    }
	}

</script>

<svelte:window on:keydown={handleKeydown}/>

<form method="POST" action="?/{action}" bind:this={actionForm}>
  <input type="hidden" name={name} bind:value={newValue} />
  <input type="hidden" name="id" value={id} />
  <span class="inline-edit" class:shadow={!value} bind:this={elem} contenteditable={editable} on:blur={doAction}>
	  {value || placeholder}
  </span>
  {#if !editable}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click|preventDefault|stopPropagation={() => editable = true}>
      <IconButton class="material-icons start-edit" ripple={false} size="button">edit</IconButton>
    </span>
  {:else}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click|preventDefault|stopPropagation={doAction}>
      <IconButton class="material-icons" ripple={false} size="button">save</IconButton>
    </span>
  {/if}
</form>

<style>
  form {
    display: inline;
    line-height: 42px;
  }
  .inline-edit {
    display: inline-block;
    border: 1px solid transparent;
  }
  form :global(.start-edit)  {
    display: none;
  }
  form:hover :global(.start-edit)  {
    display: inline-block;
  }
  .shadow {
    opacity: 0.5;
  }
</style>