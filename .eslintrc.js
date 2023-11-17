module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: ["standard-with-typescript", "plugin:react/recommended"],

  parser: "@typescript-eslint/parser",

  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },

  plugins: ["react"],

  rules: {
    "react/jsx-indent": [2, 4],
    "react/jsx-indent-props": [2, 4],
    indent: "off",
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "no-unused-vars": "warn",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "warn",
    "react/function-component-definition": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "no-shadow": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off",
    "typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/quotes": ["error", "single"],
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/member-delimiter-style": [
      "off",
      {
        multiline: {
          delimiter: "comma",
          requireLast: true,
        },
        singleline: {
          delimiter: "comma",
          requireLast: false,
        },
      },
    ],
  },

  globals: {
    __IS_DEV__: true,
  },
};
