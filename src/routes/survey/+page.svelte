<script>
    import { page } from '$app/stores'
    import { goto } from '$app/navigation';
    import Button, { Label } from '@smui/button';
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import Paper, { Title, Subtitle, Content } from '@smui/paper';
    import Date from '$lib/components/Date.svelte';



    export let data;

    const surveys = data?.data

    console.log('surveys', surveys)
</script>

<h1>Surveys</h1>

<form method="POST">
  <Button color="secondary" variant="raised">
    <Label>Create new Survey</Label>
  </Button>
</form>


    <DataTable table$aria-label="People list" style="width: 100%;">
      <Head>
        <Row>
          <Cell>Name</Cell>
          <Cell>Created</Cell>
        </Row>
      </Head>
      <Body>
        {#each surveys as survey}
        <Row on:click={() => goto(`survey/edit/${survey?.actual_revision.id}`)}>
          <Cell>{survey.name || 'Unnamed Survey'}</Cell>
          <Cell><Date date={survey.created_at} /></Cell>
        </Row>
        {/each}
      </Body>
    </DataTable>

