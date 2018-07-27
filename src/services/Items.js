/* eslint-disable */

var itemList = {
  picker: {
    id: "picker",
    name: "Steam Powered Mechanical Arm",
    baseCost: 10,
    currentCost: 10,
    production: 1,
    production_action: 'picking up',
    unlocked: true,
    count: 0,
    unlock: function(state) {}
  },
  shovel: {
    id: "shovel",
    name: "Steampunk Shovel",
    baseCost: 50,
    currentCost: 50,
    production: 5,
    production_action: 'digging up',
    unlocked: false,
    count: 0,
    unlock: function(state) {
      if (state.total >= 50 && state.score >= 50) {
        this.unlocked = true;
      }
    }
  },
  garden: {
    id: "garden",
    name: "Little Garden of Surprises",
    baseCost: 100,
    currentCost: 100,
    production: 10,
    production_action: 'growing',
    unlocked: false,
    count: 0,
    unlock: function(state) {
      if (state.total >= 1000 && state.score >= 100) {
        this.unlocked = true;
      }
    }
  },
  mine: {
    id: "mine",
    name: "Mines of Mystery",
    baseCost: 500,
    currentCost: 500,
    production: 25,
    production_action: 'mining',
    unlocked: false,
    count: 0,
    unlock: function(state) {
      if (state.total >= 10000 && state.score >= 500) {
        this.unlocked = true;
      }
    }
  },
  market: {
    id: "market",
    name: "Fleamarket of Fancy Findings",
    baseCost: 5000,
    currentCost: 5000,
    production: 75,
    production_action: 'finding',
    unlocked: false,
    count: 0,
    unlock: function(state) {
      if (state.total >= 50000 && state.score >= 5000) {
        this.unlocked = true;
      }
    }
  },
  tower: {
    id: "tower",
    name: "Tower of Inspiration",
    baseCost: 50000,
    currentCost: 50000,
    production: 300,
    production_action: 'inventing',
    unlocked: false,
    count: 0,
    unlock: function(state) {
      if (state.total >= 250000 && state.score >= 50000) {
        this.unlocked = true;
      }
    }
  },
  pillar: {
    id: "pillar",
    name: "The Pillar of Creation",
    baseCost: 500000,
    currentCost: 500000,
    production: 5000,
    production_action: 'creating',
    unlocked: false,
    count: 0,
    unlock: function(state) {
      if (state.total >= 5000000 && state.score >= 500000) {
        this.unlocked = true;
      }
    }
  }
}

const Items = {
  make(id) {
    var item = this.info(id);

    item.currentCost += Math.floor(item.currentCost * 0.2);

    return item;
  },

  info(id) {
    var item = itemList[id];
    return item;
  },

  list() {
    return itemList;
  },

  cheapest() {
    return {
      baseCost: 10
    }
  },

  unlock(state) {
    for (let id in this.list()) {
      this.list()[id].unlock(state);
    }
  }
}

export default Items
