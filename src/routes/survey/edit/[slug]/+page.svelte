<script>
  import IconButton from '@smui/icon-button';
  import Button from '@smui/button';
  import Fab, { Label, Icon } from '@smui/fab';
  import { page } from '$app/stores'
  import {  invalidateAll } from '$app/navigation';

  import SingleUpdateAction from '$lib/components/SingleUpdateAction.svelte';
  //import Section from '$lib/components/Section.svelte';
  //import Group from '$lib/components/Group.svelte';
  import Paper, { Title, Subtitle, Content } from '@smui/paper';


  import SurveyMenu from '$lib/components/SurveyMenu.svelte';

  import { tick } from 'svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  $: survey = data?.survey

  let editName = false
  let newName
  let nameForm

  let drawerOpen = true


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
  function receiceAddGroup(e) {
    console.log('add group', e.detail)
    addGroup(e.detail)
  }
  async function addGroup(section_id) {
    const response = await fetch('/api/group/add', {
      method: 'POST',
      body: JSON.stringify({ section_id }),
      headers: {
        'content-type': 'application/json'
      }
    });

    await response.json();
    await invalidateAll(true);
  }
  function receiceAddElement(e) {
    console.log('add element', e.detail)
    addElement(e.detail)
  }
  async function addElement(group_id) {
    const response = await fetch('/api/element/add', {
      method: 'POST',
      body: JSON.stringify({ group_id }),
      headers: {
        'content-type': 'application/json'
      }
    });

    await response.json();
    await invalidateAll(true);
  }

  let selectedElement = null;
  function receiceGetElementById(e) {
    console.log('get element', e.detail)
    getElementById(e.detail)
  }
  async function getElementById(id) {
    const response = await fetch('/api/element/get', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'content-type': 'application/json'
      }
    });

    selectedElement = await response.json();
    //await invalidateAll(true);
  }

</script>

<SurveyMenu data={survey} open={drawerOpen} on:addgroup={receiceAddGroup} on:addelement={receiceAddElement} on:addsection={addSection} on:editelement={receiceGetElementById}>
  <button on:click={() => drawerOpen = !drawerOpen}>Toggle</button>
  <h1>
    <SingleUpdateAction action="setName" name="name" value={survey?.survey?.[0].name} placeholder="Unnamed Survey" />
  </h1>
  {#if selectedElement}
    <Paper>
      <Title>{selectedElement.id}</Title>
      <Content>
        CONTENT
      </Content>
    </Paper>
  {:else}
    <p>Please select an element</p>
  {/if}
  <!-- <div>Version: {survey?.version}</div>

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
        <Fab color="primary" on:click={() => addGroup(section.id)} extended>
          <Icon class="material-icons">add_circle</Icon>
          <Label>Add group</Label>
        </Fab>
      </Section>
    {/each}
  </div> -->
</SurveyMenu>

