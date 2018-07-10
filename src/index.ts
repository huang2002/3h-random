const m = 1 << 20,
    a = 9,
    b = 7;

class Randomizer {

    constructor(
        public seed = Date.now(),
        public cursor = 0
    ) {
        this.reset(seed, cursor);
    }

    private _last?: number;
    private _get() {
        const { _last } = this;
        return (this._last = ((a * (_last ? _last : this.seed) + b) % m)) / m;
    }

    float(min = 0, max = 1) {
        return min + this._get() * (max - min);
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

    reset(seed = this.seed, cursor = 0) {
        this.seed = seed;
        this.cursor = cursor;
        this._last = undefined;
        for (let i = 0; i < cursor; i++) {
            this._get();
        }
        return this;
    }

}

const Random = new Randomizer();

Object.defineProperty(Random, 'Randomizer', { value: Randomizer });

export default Random as Randomizer & { Randomizer: new (seed?: number) => Randomizer };
