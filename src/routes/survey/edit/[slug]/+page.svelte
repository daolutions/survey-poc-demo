<script>
  import IconButton from '@smui/icon-button';
  /** @type {import('./$types').PageData} */
  export let data;
  console.log(data)
  let survey = data?.survey
</script>

<h1>{survey.survey.name} <IconButton class="material-icons" on:click={() => {}} ripple={false}
    >pencil</IconButton></h1>
<div>Version: {survey.version}</div>