import rollupPluginBabel from "rollup-plugin-babel";

export default {
    input: './dist/index.js',
    output: {
        file: './dist/index.umd.js',
        format: 'umd',
        name: 'Random'
    },
    plugins: [
        rollupPluginBabel()
    ]
}
