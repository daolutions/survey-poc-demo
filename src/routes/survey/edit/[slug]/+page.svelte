<script>
  import IconButton from '@smui/icon-button';
  import Button from '@smui/button';
  import Fab, { Label, Icon } from '@smui/fab';
  import { page } from '$app/stores'
  import {  invalidateAll } from '$app/navigation';

  import SingleUpdateAction from '$lib/components/SingleUpdateAction.svelte';
  import Section from '$lib/components/Section.svelte';
  import Group from '$lib/components/Group.svelte';

  import { tick } from 'svelte';

  /** @type {import('./$types').PageData} */
  export let data;
  console.log(data)
  $: survey = data?.survey

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

  // async function addSection() {
  //   console.log('addSection')
  // }

  let total = 0;
  async function addSection() {
    const response = await fetch('/api/section/add', {
      method: 'POST',
      body: JSON.stringify({ survey_id: survey.id }),
      headers: {
        'content-type': 'application/json'
      }
    });

    await response.json();
    await invalidateAll(true);
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
  <SingleUpdateAction action="setName" name="name" value={survey?.survey?.[0].name} placeholder="Unnamed Survey" />
</h1>
<div>Version: {survey?.version}</div>

<Fab color="primary" on:click={addSection} extended>
  <Icon class="material-icons">add_circle</Icon>
  <Label>Add section</Label>
</Fab>

<div class="sections">
  {#each survey?.section as section}
    <Section data={section}>
      {#each section?.group as group}
        <Group data={group} />
      {/each}
    </Section>
  {/each}
</div>