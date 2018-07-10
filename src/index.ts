class Randomizer {

    constructor(public seed = Date.now()) { }

    cursor = 0;

    float(min = 0, max = 1) {
        return min + ((Math.sin(this.seed + 2 * this.cursor++) + 1) / 2 % 1) * (max - min);
    }

    int(min = 1, max = 100) {
        return Math.round(this.float(min, max));
    }

    boolean() {
        return this.float() >= .5;
    }

    string(radix = 16, upperCase = true) {
        let ans = this.float().toString(radix).slice(2);
        if (upperCase) {
            ans = ans.toUpperCase();
        }
        return ans;
    }

    reset(seed = this.seed) {
        this.seed = seed;
        this.cursor = 0;
        return this;
    }

}

const Random = new Randomizer();

Object.defineProperty(Random, 'Randomizer', { value: Randomizer });

export default Random as Randomizer & { Randomizer: new (seed?: number) => Randomizer };
