const fishesData = require('../data');

class Fish {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.weight = data.weight;
        this.length = data.length;
    }

    static get all() {
        const fishes = fishesData.map((fish) => new Fish(fish));
        return fishes;
    }

    static findById(id) {
        try {
            const fishData = fishesData.filter((fish) => fish.id === id)[0];
            const fish = new Fish(fishData);
            return fish;
        } catch (err) {
            throw new Error('That fish does not exist.');
        }
    }

    static create(fish) {
        const newFishId = fishesData.length + 1;
        const newFish = new Fish({ id: newFishId, ...fish });
        fishesData.push(newFish);
        return newFish;
    }

    destroy() {
        fishesData.splice(fishesData.indexOf(this), 1);
    }
}

module.exports = Fish;