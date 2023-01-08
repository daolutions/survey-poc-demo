<script>
  import IconButton from '@smui/icon-button';
  import Button from '@smui/button';
  import Fab, { Label, Icon } from '@smui/fab';
  import Card, { PrimaryAction  } from '@smui/card';
  import { page } from '$app/stores'
  import {  goto, invalidateAll } from '$app/navigation';

  import { selectedElement, currentSurvey } from '$lib/Stores.js';

  import SingleUpdateAction from '$lib/components/SingleUpdateAction.svelte';
  import Likert from '$lib/components/elements/Likert.svelte';
  import SingleChoice from '$lib/components/elements/SingleChoice.svelte';
  import Dropdown from '$lib/components/elements/Dropdown.svelte';
  //import Section from '$lib/components/Section.svelte';
  //import Group from '$lib/components/Group.svelte';
  import Paper, { Title, Subtitle, Content } from '@smui/paper';


  import SurveyMenu from '$lib/components/SurveyMenu.svelte';

  import { onDestroy } from 'svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  currentSurvey.set(data?.survey)

  //$: survey = data?.survey

  console.log($currentSurvey)

  $: if(!$selectedElement) {
    if($currentSurvey?.section?.[0].group?.[0].element?.length > 0) {
      selectedElement.set($currentSurvey.section[0].group[0].element[0])
    }
  }

  onDestroy(() => selectedElement.set(null));

  let newName
  let nameForm

  let drawerOpen = true

  const elementTypes = {
    'singlechoice': {
      component: SingleChoice,
      name: 'Single Choice',
    },
    'likert': {
      component: Likert,
      name: 'Likert Scale',
    },
    'dropdown': {
      component: Dropdown,
      name: 'Dropdown List',
    },
  }

  // ADDING SECTIONS
  async function addSection() {
    const response = await fetch('/api/section/add', {
      method: 'POST',
      body: JSON.stringify({ survey_id: $currentSurvey.id }),
      headers: {
        'content-type': 'application/json'
      }
    });

    await response.json();
    await invalidateAll(true);
  }

  // ADDING GROUPS
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

  // ADDING ELEMENTS
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

  // SAVING ELEMENTS
  async function saveElement(e) {
    let element = e.detail
    const response = await fetch('/api/element/set', {
      method: 'POST',
      body: JSON.stringify( element ),
      headers: {
        'content-type': 'application/json'
      }
    });

    let updatedElement = await response.json();
    selectedElement.set(updatedElement);
  }

</script>

<SurveyMenu data={$currentSurvey} open={drawerOpen} on:addgroup={receiceAddGroup} on:addelement={receiceAddElement} on:addsection={addSection} > <!-- on:getelementbyid={receiceGetElementById} -->
  <button on:click={() => goto(`/survey`)}>Back to Surveys</button>
  <!-- <button on:click={() => drawerOpen = !drawerOpen}>Toggle</button> -->
  <h1>
    <SingleUpdateAction action="setName" name="name" value={$currentSurvey?.survey?.[0].name} placeholder="Unnamed Survey" />
  </h1>
  {#if $selectedElement}
    {#if $selectedElement.type}
      <svelte:component this={elementTypes[$selectedElement.type].component} data={$selectedElement} on:save={saveElement}/>
    {:else}
      <p>Please select an element type</p>
        <div class="card-container">
            {#each Object.keys(elementTypes) as type}
              <Card padded>
                <PrimaryAction on:click={() => selectedElement.update(e => {e.type = type; return e})}>
                  <div class="element-type-icon chosable element-type-icon-{type}">
                  </div>
                  <h4>{elementTypes[type].name}</h4>
                </PrimaryAction>
              </Card>
            {/each}
        </div>


    {/if}
  {:else}
    <p>Please select an element</p>
  {/if}

</SurveyMenu>

<style lang="scss">

  .card-container {
    display: flex;
    gap: 1rem;
    text-align: center;

    :global(.mdc-card) {
      background-color: #43a1a7;
      max-width: 15%;
      flex: 1 1 0;
    }
  }

</style>
