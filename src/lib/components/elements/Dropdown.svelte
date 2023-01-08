<script>
  import IconButton from '@smui/icon-button';
  import Button from '@smui/button';
  import Fab, { Label, Icon } from '@smui/fab';

  import SingleUpdateAction from '$lib/components/SingleUpdateAction.svelte';

  import Paper, { Title, Subtitle, Content } from '@smui/paper';

  export let data;
</script>

<Paper>
  <Title>{data?.id}</Title>
  <Content>
    DROPDOWN
  </Content>
</Paper>