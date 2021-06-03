module.exports = {
    optimize: {
        bundle: true,
        minify: true,
        target: 'es2018',
    },
    plugins: [
        [
            '@snowpack/plugin-sass',
        ]
    ],
};
