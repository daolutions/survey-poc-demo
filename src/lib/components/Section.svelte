<script>
  import Paper, { Title, Subtitle, Content } from '@smui/paper';
  import SingleUpdateAction from '$lib/components/SingleUpdateAction.svelte';
	export let data;

</script>

<Paper>
    <Title><SingleUpdateAction action="setSectionName" name="name" id={data?.id} value={data?.name} placeholder="Unnamed Section" /></Title>
    <Content>
      <slot></slot>
    </Content>
</Paper>