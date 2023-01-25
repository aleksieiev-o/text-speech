module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    extends: [
        // Uses the recommended rules from @eslint-plugin-react
        'plugin:react/recommended',
        // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",

        'no-empty': 0,
        semi: 2,
        'no-var': 'error',
        'arrow-body-style': 0,
        camelcase: 0,
        'no-underscore-dangle': 0,
        'global-require': 0,
        indent: 0,
        'import/no-dynamic-require': 0,
        'import/no-unresolved': 0,
        'import/no-webpack-loader-syntax': 0,
        'import/order': 0,
        'import/extensions': 0,
        'import/first': 0,
        'linebreak-style': 0,
        'max-len': [2, {code: 180}],
        'no-console': [1, {allow: ['warn', 'error']}],
        'no-debugger': 1,
        'no-param-reassign': 0,
        'no-plusplus': 0,
        'no-multiple-empty-lines': [2, {max: 1, maxBOF: 3, maxEOF: 1}],
        quotes: [2, 'single', {allowTemplateLiterals: true}],
    },
};
