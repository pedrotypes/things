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
        name: "Thing Garden",
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
