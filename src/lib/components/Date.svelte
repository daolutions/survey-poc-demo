<script>
  import dayjsCJS from 'dayjs'
  import dayjsESM from 'dayjs/esm'

  let dayjs = !dayjsCJS ? dayjsESM : dayjsCJS

  export let date = new Date();

  const dayjsDate = dayjs(date).format('DD.MM.YYYY HH:mm');

</script>

<span>{dayjsDate}</span>