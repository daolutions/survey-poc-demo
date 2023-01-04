<script>
  import { createEventDispatcher } from 'svelte';
  import Drawer, { AppContent, Content, Header, Title } from '@smui/drawer'; 
  import IconButton from '@smui/icon-button';
  import List, { Item, Text } from '@smui/list';
  import Fab, { Label, Icon } from '@smui/fab';
  import SingleUpdateAction from '$lib/components/SingleUpdateAction.svelte';


  export let open = true;

  export let data;

  $: sections = data?.section || [];

  const dispatch = createEventDispatcher();

  //console.log('data', data)
</script>

<div class="drawer-container">
  <Drawer bind:open variant="modal" >
    <Header>
      <Title tabindex="0">{data?.survey?.[0].name}</Title>
    </Header>
    <Content>
        {#each sections as section}
          <div class="section-header"><SingleUpdateAction action="setSectionName" name="name" id={section?.id} value={section?.name} placeholder="Unnamed Section" /></div>
            {#each section?.group as group}
              <div class="group-menu">
                <div class="group-header"><SingleUpdateAction action="setGroupName" name="name" id={group?.id} value={group?.name} placeholder="Unnamed Group" /></div>
                <List class="element-list">
                  {#each group?.element as element}
                    <Item on:click="{() => dispatch('editelement', element?.id)}">
                      <Text>{element?.name || 'Unnamed element'}</Text>
                    </Item>
                  {/each}
                </List>
                <IconButton class="material-icons quick-add-element" on:click="{() => dispatch('addelement', group?.id)}" ripple={false} size="button">add</IconButton>
              </div>
            {/each}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="quick-add-group" on:click="{() => dispatch('addgroup', section?.id)}">Add group</div>
        {/each}
        <Fab class="quick-add-section" color="secondary" on:click="{() => dispatch('addsection', null)}" extended>
          <Icon class="material-icons">add_circle</Icon>
          <Label>Add section</Label>
        </Fab>
    </Content>
  </Drawer>
 
  <AppContent class="app-content">
    <main class="main-content">
      <slot></slot>
    </main>
  </AppContent>
</div>

<style lang="scss">
  /* These classes are only needed because the
    drawer is in a container on the page. */
  .drawer-container {
    position: relative;
    display: flex;
    height: 100vh;
    max-width: 100vw;
    border: 1px solid
      var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    overflow: hidden;
    z-index: 0;
  }

  .drawer-container :global(.mdc-drawer--dismissible) {
    display: flex !important;
  }
 
  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }
 
  .main-content {
    overflow: auto;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
  }

  :global(.mdc-drawer__header) {
    border-bottom: 1px solid;
  }
  .section-header {
    font-size: 1rem;
    font-weight: 500;
    padding-left: 5px;
    border-top: 1px solid;
  }
  .group-header {
    font-size: .9rem;
    font-weight: 500;
    padding-left: 15px;
    border-top: 1px dotted;
  }
  .quick-add-group {
    text-align: center;
    font-size: 0.7rem;
    opacity: 0.7;
    border-top: 1px dotted transparent;
    color: var(--custom-color);
    cursor: pointer;
    &:hover {
      border-top: 1px dotted;
      background-color: rgb(160, 203, 191);
    }
  }
  :global(.quick-add-section) {
    height: 30px;
    width: calc(100% - 40px);
    margin: 20px;
  }
  .group-menu {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
  :global(.element-list) {
    padding: 0;
  }
  :global(.mdc-icon-button.quick-add-element) {
    padding: 0px;
    width: 20px;
    height: 20px;
    align-self: flex-end;
    :global(.mdc-icon-button__ripple) {
      width: 20px !important;
      height: 20px !important;
    }
  }
</style>