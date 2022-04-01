/**
 * Type of options of {@link Randomizer}.
 */
export type RandomizerOptions = Partial<{
    /**
     * Randomization seed.
     * @default Date.now()
     */
    seed: number;
    /**
     * Initial position in the random sequence.
     * (Starts from zero.)
     * @default 0
     */
    cursor: number;
    /**
     * Randomization coefficient.
     * (next = (a * prev + b) % m)
     * @default 1 << 20
     */
    m: number;
    /**
     * Randomization coefficient.
     * (next = (a * prev + b) % m)
     * @default 9
     */
    a: number;
    /**
     * Randomization coefficient.
     * (next = (a * prev + b) % m)
     * @default 7
     */
    b: number;
}>;
/** dts2md break */
/**
 * Class of seedable randomizers.
 */
export class Randomizer {
    /** dts2md break */
    /**
     * Constructor of {@link Randomizer}.
     */
    constructor(options?: RandomizerOptions) {
        this.seed = options?.seed ?? Date.now();
        this.cursor = options?.cursor ?? 0;
        this.m = options?.m ?? (1 << 20);
        this.a = options?.a ?? 9;
        this.b = options?.b ?? 7;
        this.reset(this.seed, this.cursor);
    }
    /** dts2md break */
    /**
     * Randomization seed.
     */
    seed: number;
    /** dts2md break */
    /**
     * Current position in the random sequence.
     */
    cursor: number;
    /** dts2md break */
    /**
     * Randomization coefficient.
     * (next = (a * prev + b) % m)
     */
    m: number;
    /** dts2md break */
    /**
     * Randomization coefficient.
     * (next = (a * prev + b) % m)
     */
    a: number;
    /** dts2md break */
    /**
     * Randomization coefficient.
     * (next = (a * prev + b) % m)
     */
    b: number;

    private _current = 0;

    private _next() {
        const { _current, a, b, m } = this;
        const next = (a * _current + b) % m;
        this._current = next;
        this.cursor = (this.cursor + 1) % m;
        return next / m;
    }
    /** dts2md break */
    /**
     * Get a random float in range [min, max).
     * By default, `min === 0` and `max === 1`.
     */
    float(): number;
    /** dts2md break */
    /**
     * Get a random float in range [min, max).
     * By default, `min === 0` and `max === 1`.
     */
    float(min: number, max: number): number;
    float(min = 0, max = 1) {
        return min + this._next() * (max - min);
    }
    /** dts2md break */
    /**
     * Get a random integer in range [min, max).
     * By default, `min === 0` and `max === 100`.
     */
    integer(): number;
    /** dts2md break */
    /**
     * Get a random integer in range [min, max).
     * By default, `min === 0` and `max === 100`.
     */
    integer(min: number, max: number): number;
    integer(min = 0, max = 100) {
        return Math.floor(this.float(min, max));
    }
    /** dts2md break */
    /**
     * Get a random boolean,
     * where the probability of `true` is 0.5 by default.
     * (Returns `this.float() < trueProbability`.)
     */
    boolean(trueProbability = 0.5) {
        return this.float() < trueProbability;
    }
    /** dts2md break */
    /**
     * Get a random string.
     * (Returns `this.float().toString(radix).slice(2)`.)
     */
    string(radix = 16) {
        return this.float().toString(radix).slice(2);
    }
    /** dts2md break */
    /**
     * Get a random element in the given array.
     */
    choice<T>(choices: ArrayLike<T>) {
        const index = this.integer(0, choices.length);
        return choices[index];
    }
    /** dts2md break */
    /**
     * Reset the randomizer.
     */
    reset(seed = this.seed, cursor = 0) {
        const _cursor = cursor % this.m;
        this.seed = seed;
        this.cursor = _cursor;
        this._current = seed;
        for (let i = 0; i < _cursor; i++) {
            this._next();
        }
        return this;
    }

}
