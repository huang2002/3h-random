import babel from "@rollup/plugin-babel";

const input = './js/index.js';

export default [
    {
        input,
        plugins: [
            babel({
                babelHelpers: 'bundled',
                presets: [
                    ['@babel/preset-env', {
                        loose: true,
                    }],
                ],
            }),
        ],
        output: {
            format: 'umd',
            name: 'HRandom',
            file: './dist/3h-random.umd.js',
        },
    },
    {
        input,
        output: {
            format: 'esm',
            file: './dist/3h-random.js',
        },
    },
];
