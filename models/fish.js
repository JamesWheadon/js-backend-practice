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

    findInfo(data) {
        let fishInfo = {}
        for (const key of Object.keys(data)) {
            if (key == 'weight') {
                try {
                    fishInfo.weight = this.weight;
                }
                catch (err) {
                    throw new Error('Must be a number for weight or length')
                }
            } else if (key == 'length') {
                try {
                    fishInfo.length = this.length;
                }
                catch (err) {
                    throw new Error('Must be a number for weight or length')
                }
            } else if (key == 'name') {
                fishInfo.name = this.name;
            } else {
                throw new Error('Invalid query key')
            }
        }
        return fishInfo;
    }

    static create(fish) {
        const newFishId = fishesData.length + 1;
        const newFish = new Fish({ id: newFishId, ...fish });
        fishesData.push(newFish);
        return newFish;
    }

    destroy() {
        fishesData.splice(this.id - 1, 1);
    }

    update(data) {
        for (const key of Object.keys(data)) {
            if (key == 'weight') {
                try {
                    let numberData = parseFloat(data.weight);
                    fishesData[this.id - 1].weight = numberData;
                }
                catch (err) {
                    throw new Error('Must be a number for weight or length')
                }
            } else if (key == 'length') {
                try {
                    let numberData = parseFloat(data.length);
                    fishesData[this.id - 1].length = numberData;
                }
                catch (err) {
                    throw new Error('Must be a number for weight or length')
                }
            } else if (key == 'name') {
                fishesData[this.id - 1].name = data.name
            } else {
                throw new Error('Invalid query key')
            }
        }
    }
}

module.exports = Fish;