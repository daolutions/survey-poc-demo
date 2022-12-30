<script>
  //import dayjsCJS from 'dayjs'
  //import dayjsESM from 'dayjs/esm'

  import dayjs from 'dayjs'

  //export const ssr = false;
  //let dayjs = !dayjsCJS ? dayjsESM : dayjsCJS

  export let date = new Date();

  const dayjsDate = dayjs(date).format('DD.MM.YYYY HH:mm');

</script>

<span>{dayjsDate}</span>