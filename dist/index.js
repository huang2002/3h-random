const m = 1 << 20, a = 9, b = 7;
class Randomizer {
    constructor(seed = Date.now(), cursor = 0) {
        this.seed = seed;
        this.cursor = cursor;
        this.reset(seed, cursor);
    }
    _get() {
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
    element(arrayLike) {
        return arrayLike[this.int(0, arrayLike.length - 1)];
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
export default Random;
