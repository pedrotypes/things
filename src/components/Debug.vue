<template>

  <fieldset class="debug" v-if="debugging">
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
  data () {
    return {
      debugging: process.env.NODE_ENV === 'development'
    }
  },
  computed: {
    ...mapState(['score', 'total', 'clicks', 'production', 'speed', 'isPaused'])
  },
  created () {
    // listen to d key for debug
    window.addEventListener('keypress', function (e) {
      if (e.keyCode === 100) {
        this.debugging = !this.debugging
      }
    }.bind(this))
  }
}
</script>
