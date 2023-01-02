<script>
  import Paper, { Title, Subtitle, Content } from '@smui/paper';
  import SingleUpdateAction from '$lib/components/SingleUpdateAction.svelte';
	export let data;

</script>

<Paper variant="outlined">
    <Title><SingleUpdateAction action="setGroupName" name="name" id={data?.id} value={data?.name} placeholder="Unnamed Group" /></Title>
    <Content>
      <slot></slot>
    </Content>
</Paper>

