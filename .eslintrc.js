module.exports = {
    root: true,
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        jest: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        // Extend ESLint base recommendations
        "eslint:recommended",
        // Override some rules that don't apply with typescript
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        // Turn off rules that prettier deals with
        "prettier",
        "prettier/@typescript-eslint",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    plugins: ["@typescript-eslint", "react-hooks"],
    rules: {
        // Typescript rules
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "interface",
                format: ["PascalCase"],
                custom: {
                    regex: "^I[A-Z]",
                    match: true,
                },
            },
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-use-before-define": "warn",
        // Basic ESLint rules
        "linebreak-style": ["warn", "windows"],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        // import rules
        "import/no-unresolved": ["error"],
        "import/no-absolute-path": ["error"],
    },
    settings: {
        "import/ignore": "node_modules",
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
                project: [
                    "packages/server/tsconfig.json",
                    "packages/client/tsconfig.json",
                ],
            }, // this loads tsconfig.json to eslint
        },
    },
};
