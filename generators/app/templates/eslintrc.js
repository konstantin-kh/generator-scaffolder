module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jquery": true
  },
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "no-use-before-define": ["error", {"functions": false, "classes": true}],
    "max-len": ["error", {"code": 120, "ignoreUrls": true}],
    "consistent-return": ["off"],
    "no-unused-expressions": ["off"],
    "no-extra-boolean-cast": ["off"],
    "no-confusing-arrow": "error",
    "no-mixed-operators": "error",
    "no-plusplus": ["off"],
    "quotes": ["error", "single", {"avoidEscape": true, "allowTemplateLiterals": false}],
    "no-restricted-syntax": [
      "error",
      {
        "selector": "SequenceExpression",
        "message": "The comma operator is confusing and a common mistake. Don’t use it!"
      }
    ],
    "linebreak-style": ["off"],
    "lines-around-comment": ["off"],
    "prefer-destructuring": [
      "off",
      {
        "array": true,
        "object": true
      },
      {
        "enforceForRenamedProperties": false
      }
    ],
    "prettier/prettier": ["error"]
  }
}
