/* eslint-disable */

<template>

  <button
    @click="buy(itemId)"
    :disabled="state.score < item.currentCost"
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
  methods: {
    buy (itemId) {
      // Get item info and determine whether we can buy it
      var info = Items.info(itemId)
      var cost = info.currentCost
      if (this.state.score < cost) return

      // Create the item
      var item = Items.make(itemId)
      item.count++
      item.built++

      // Pay the price
      this.state.score -= cost
      this.state.production += item.production

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
      Items.unlock(this.state)
    }
  },
  created: function () {
  }
}
</script>
