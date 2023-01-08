<script>
  import { createEventDispatcher } from 'svelte';
  import { selectedElement } from '$lib/Stores.js';

  import IconButton from '@smui/icon-button';
  import Button from '@smui/button';
  import Fab, { Label, Icon } from '@smui/fab';
  import Textfield from '@smui/textfield';
  import Paper, { Title, Subtitle, Content } from '@smui/paper';


  import SingleUpdateAction from '$lib/components/SingleUpdateAction.svelte';

  const dispatch = createEventDispatcher();

  //$: element = $selectedElement;

  let element
  let elementdata;
  let elementdataTemplate = {
    scales: 5,
    labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    values: [1, 2, 3, 4, 5],
    question: 'How much do you agree with this statement?', 
  };
  let valuesStartWith;
  let currentScales;
  const unsubscribe = selectedElement.subscribe(value => {
    element = value;
    elementdata = element?.json_data || elementdataTemplate;
    valuesStartWith = elementdata?.values[0] || 1;
    currentScales = elementdata?.scales || 5;
  });

  $: if(valuesStartWith != elementdata.values[0]) {
    elementdata.values = elementdata.values.map((value, index) => {
      return valuesStartWith + index;
    });
    //console.log(data.values);
  }
  $: if(currentScales != elementdata.scales) {
    let diff = currentScales - elementdata.scales;
    elementdata.scales = currentScales;
    if(diff > 0) {
      for(let i = 0; i < diff; i++) {
        elementdata.values.push(elementdata.values[elementdata.values.length - 1] + 1);
        elementdata.labels.push("New Label");
      }
    } else {
      elementdata.values = elementdata.values.slice(0, currentScales);
      elementdata.labels = elementdata.labels.slice(0, currentScales);
    }    
    //console.log(data);
  }

  async function saveElement() {
    let elementToSave = {
      id: element.id,
      type: element.type,
      json_data: elementdata
    };
    dispatch('save', elementToSave)
  }


  //export let data;
</script>

<div class="element-detail-wrapper">
  <div class="element-detail-actions">
    <Fab color="primary" on:click={saveElement}>
      <Icon class="material-icons">save</Icon>
    </Fab>
  </div>
  <Paper>
    <Title>{$selectedElement.id}<div class="element-type-icon chosable inverted element-type-icon-{element?.type}"></div></Title>
    <Content>
      <Textfield style="width: 100%;" label="Question" bind:value={elementdata.question} type="text" />
      <Textfield label="Scales" bind:value={currentScales} type="number" />
      <Textfield label="Scales start with" bind:value={valuesStartWith} type="number" />
      <div class="likert-scales-wrapper">
      {#each elementdata.labels as label, index}
        <Textfield label="Label {index + 1}" bind:value={elementdata.labels[index]} type="text" />
      {/each}
      </div>
    </Content>
  </Paper>
</div>

<style lang="scss">
  .element-detail-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  }
  .element-detail-actions {
    display: flex;
    flex-direction: row-reverse;
    position: absolute;
    right: -0.5rem;
    top: -0.5rem;
  }
  .likert-scales-wrapper {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    :global(.mdc-text-field){
      flex: 1 1 0;
    }
  }
</style>