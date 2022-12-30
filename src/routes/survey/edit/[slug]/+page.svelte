<script>
  import IconButton from '@smui/icon-button';
  import Button, { Label } from '@smui/button';
  import SingleUpdateAction from '$lib/components/SingleUpdateAction.svelte';

  import { tick } from 'svelte';

  /** @type {import('./$types').PageData} */
  export let data;
  console.log(data)
  let survey = data?.survey

  let editName = false
  let newName
  let nameForm

  async function saveName() {
    editName = false
    if (document?.getElementById('survey-name')){
      newName = document.getElementById('survey-name').innerText
      if (newName !== survey.survey.name) {
        survey.survey.name = newName
        console.log('saving', newName)
        await tick()
        nameForm.submit()
      }
    }
  }

  $: if (editName) {
    const span = document.getElementById('survey-name')
    tick().then(() => {
      span.focus()
      window.getSelection().selectAllChildren(span);
    });
  } 
</script>

<h1>
  <!-- <form method="POST" action="?/saveName" bind:this={nameForm}>
    <input type="hidden" name="survey-name" bind:value={newName} />
    <span id="survey-name" contenteditable={editName}>{survey.survey.name || 'Unnamed Survey'}</span> 
    {#if !editName}
      <IconButton class="material-icons" on:click={() => {editName = true}} ripple={false}>edit</IconButton>
    {:else}
      <IconButton class="material-icons" on:click={() => saveName()} ripple={false}>save</IconButton>
    {/if}
  </form> -->
  <SingleUpdateAction action="setName" name="name" value={survey.survey?.[0].name} placeholder="Noname Survey" />
</h1>
<div>Version: <SingleUpdateAction action="setVersion" name="version" value={survey.version} />{survey.version}</div>