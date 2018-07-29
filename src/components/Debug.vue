<template>

  <fieldset class="debug">
    <label>State</label>
    <ul>
      <li>score: {{score}}</li>
      <li>clicks: {{clicks}}</li>
      <li>total: {{total}}</li>
      <li>production: {{production}}</li>
      <li>game speed: {{speed}}x</li>
      <li>is paused: {{ isPaused }}</li>
    </ul>
  </fieldset>

</template>

<style lang="css" scoped>
.debug {
  margin-top: 1em;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['score', 'total', 'clicks', 'production', 'speed', 'isPaused'])
  }
}
</script>
