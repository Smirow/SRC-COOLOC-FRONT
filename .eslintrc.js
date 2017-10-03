// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    "no-cond-assign": "error",
    "no-console": "off",
    "no-unused-expressions": "error",

    "array-bracket-spacing": ["error", "never"],
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs", {"allowSingleLine": true}],
    "comma-spacing": ["error", {"before": false, "after": true}],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "eol-last": ["error", "unix"],
    "func-names": 0,
    "func-call-spacing": ["error", "never"],
    "indent": ["error", "tab"],
    "key-spacing": ["error", {"beforeColon": false, "afterColon": true,
      "mode": "strict"}],
    "keyword-spacing": ["error", {
      "before": true,
      "after": true
    }],
    "max-len": ["error", 120, 4, {"ignoreComments": true, "ignoreUrls": true,
      "ignorePattern": "^\\s*var\\s.+=\\s*require\\s*\\("}],
    "no-array-constructor": 2,
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "no-redeclare": ["error"],
    "no-trailing-spaces": 2,
    "object-curly-spacing": ["error", "always"],
    "one-var": ["error", {
      "initialized": "never",
      "uninitialized": "always"
    }],
    "operator-linebreak": ["error", "after"],
    "padded-blocks": ["error", "never"],
    "quotes": ["error", "single", "avoid-escape"],
    "semi-spacing": ["error", {"before": false, "after": true}],
    "semi": ["error", "always"],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", "always"],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": ["error", {"int32Hint": false}],
    "spaced-comment": ["error", "always", {
      "line": {
        "markers": ["/"],
        "exceptions": ["-"]
      },
      "block": {
        "balanced": true,
        "markers": ["!"],
        "exceptions": ["*"]
      }
    }],
    "strict": ["error", "global"]
  }
}
