<template>

  <button
    @click="buy(itemId)"
    :disabled="score < item.currentCost"
  >
    {{ item.name }} ({{ item.currentCost }} {{ txt.currency_plural }})
  </button>

</template>

<style lang="css" scoped>
</style>

<script>
import Items from '../services/Items.js'
import Txt from '../services/Txt.js'

export default {
  props: {
    itemId: null,
    item: {},
    state: {}
  },
  data () {
    return {
      txt: Txt
    }
  },
  computed: {
    score () {
      return this.$store.state.score
    },
    total () {
      return this.$store.state.total
    },
    production () {
      return this.$store.state.production
    }
  },
  methods: {
    buy (itemId) {
      // Get item info and determine whether we can buy it
      var info = Items.info(itemId)
      var cost = info.currentCost
      if (this.score < cost) return

      // Create the item
      var item = Items.make(itemId)
      item.count++
      item.built++

      // Pay the price
      this.$store.commit('pay', cost)
      this.$store.commit('addProduction', item.production)

      // Update the item list
      var found = false
      for (let i in this.state.items) {
        if (this.state.items[i].id === itemId) {
          found = true
        }
      }
      if (!found) {
        this.state.items.push(item)
      }

      // Unlock other items?
      Items.unlock(this.score, this.total)
    }
  },
  created: function () {
  }
}
</script>
