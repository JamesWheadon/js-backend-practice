const fishData = require('../data');

class Fish {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.weight = data.weight;
        this.length = data.length;
    }

    static get all() {
        const fish = fishData.map((fish) => new Fish(fish));
        return fish;
    }

    static create(fish) {
        const newFishId = fishData.length + 1;
        const newFish = new Fish({ id: newFishId, ...fish });
        fishData.push(newFish);
        return newFish;
    }
}

module.exports = Fish;