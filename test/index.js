// @ts-check
const T =/** @type {import('3h-test')} */(
    /** @type {unknown} */(require('3h-test'))
);
const HRandom =/** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-random.umd.js'))
);

const ITERATION_COUNT = 1e4;

/**
 * @type {<T>(fn: () => T, checker: (v: T) => boolean) => T.TestCaseCallback}
 */
const createCheck = (fn, checker) => (
    (context) => {
        for (let i = 0; i < ITERATION_COUNT; i++) {
            context.assert(
                checker(fn()),
                'check failed',
            );
        }
    }
);

const commonRandomizer = new HRandom.Randomizer();
const testChoices = ['A', 'B', 'C', 'D', 'E'];

T.test(null, {

    float_default: createCheck(
        () => (commonRandomizer.float()),
        (x) => ((x >= 0) && (x < 1)),
    ),

    float_min_max: createCheck(
        () => (commonRandomizer.float(1, 2)),
        (x) => ((x >= 1) && (x < 2)),
    ),

    integer_default: createCheck(
        () => (commonRandomizer.integer()),
        (x) => ((x >= 0) && (x < 100)),
    ),

    integer_min_max: createCheck(
        () => (commonRandomizer.integer(100, 200)),
        (x) => ((x >= 100) && (x < 200)),
    ),

    boolean_default(context) {
        let trueCount = 0;
        for (let i = 0; i < ITERATION_COUNT; i++) {
            const value = commonRandomizer.boolean();
            context.assert(
                typeof value === 'boolean',
                'expect a boolean',
            );
            if (value) {
                trueCount++;
            }
        }
        const trueRate = trueCount / ITERATION_COUNT;
        context.assert(
            (trueRate >= 0.45) && (trueRate <= 0.55),
            'unexpected true rate',
        );
    },

    boolean_probability(context) {
        let trueCount = 0;
        for (let i = 0; i < ITERATION_COUNT; i++) {
            const value = commonRandomizer.boolean(0.8);
            context.assert(
                typeof value === 'boolean',
                'expect a boolean',
            );
            if (value) {
                trueCount++;
            }
        }
        const trueRate = trueCount / ITERATION_COUNT;
        context.assert(
            (trueRate >= 0.75) && (trueRate <= 0.85),
            'unexpected true rate',
        );
    },

    string_default(context) {
        const characters = new Set();
        for (let i = 0; i < ITERATION_COUNT; i++) {
            const value = commonRandomizer.string();
            context.assert(
                typeof value === 'string',
                'expect a string',
            );
            for (let j = 0; j < value.length; j++) {
                characters.add(value[j]);
            }
        }
        context.assertStrictEqual(
            characters.size,
            16,
        );
    },

    string_radix(context) {
        const RADIX = 36;
        const characters = new Set();
        for (let i = 0; i < ITERATION_COUNT; i++) {
            const value = commonRandomizer.string(RADIX);
            context.assert(
                typeof value === 'string',
                'expect a string',
            );
            for (let j = 0; j < value.length; j++) {
                characters.add(value[j]);
            }
        }
        context.assertStrictEqual(
            characters.size,
            RADIX,
        );
    },

    choice: createCheck(
        () => (commonRandomizer.choice(testChoices)),
        (x) => (testChoices.includes(x)),
    ),

    reset_and_copy(context) {

        const SEQUENCE_LENGTH = 10;
        const { seed, cursor } = commonRandomizer;

        /**
         * @param {HRandom.Randomizer} randomizer
         */
        const generateSequence = (randomizer) => (
            Array.from(
                { length: SEQUENCE_LENGTH },
                () => (randomizer.integer()),
            )
        );

        const sequence0 = generateSequence(commonRandomizer);

        const copyRandomizer = new HRandom.Randomizer({
            seed,
            cursor,
        });
        commonRandomizer.reset(seed, cursor);

        const sequence1 = generateSequence(commonRandomizer);
        const sequence2 = generateSequence(copyRandomizer);

        context.assertDeepEqual(sequence0, sequence1);
        context.assertDeepEqual(sequence0, sequence2);

    },

});
