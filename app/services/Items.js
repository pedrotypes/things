var itemList = {
    picker: {
        id: "picker",
        name: "Mechanical Hand",
        baseCost: 10,
        currentCost: 10,
        production: 1,
        production_action: 'picking up',
        unlocked: true,
        count: 0,
        unlock: function(state) {}
    },
    garden: {
        id: "garden",
        name: "Uncanny Garden",
        baseCost: 50,
        currentCost: 50,
        production: 5,
        production_action: 'growing',
        unlocked: false,
        count: 0,
        unlock: function(state) {
            if (state.total >= 50 && state.score >= 50) {
                this.unlocked = true;
            }
        }
    },
    farm: {
        id: "farm",
        name: "Weird Farm",
        baseCost: 100,
        currentCost: 100,
        production: 10,
        production_action: 'harvesting',
        unlocked: false,
        count: 0,
        unlock: function(state) {
            if (state.total >= 1000 && state.score >= 1000) {
                this.unlocked = true;
            }
        }
    },
    mine: {
        id: "mine",
        name: "Mysterious Mine",
        baseCost: 500,
        currentCost: 500,
        production: 25,
        production_action: 'digging up',
        unlocked: false,
        count: 0,
        unlock: function(state) {
            if (state.total >= 5000 && state.score >= 5000) {
                this.unlocked = true;
            }
        }
    },
    factory: {
        id: "factory",
        name: "Funny Factory",
        baseCost: 5000,
        currentCost: 5000,
        production: 75,
        production_action: 'building',
        unlocked: false,
        count: 0,
        unlock: function(state) {
            if (state.total >= 5000 && state.score >= 5000) {
                this.unlocked = true;
            }
        }
    }
};

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

export default Items;
