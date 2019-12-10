module.exports = {
  extends: 'airbnb',
  plugins: [
    "react-hooks"
  ],
  rules: {
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx']
    }],
    'jsx-a11y/label-has-associated-control': ['off'],
    'camelcase': ['off'],
    'no-shadow': ['off'],
    'function-paren-newline': ['error', 'consistent'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/interactive-supports-focus': ['off'],
    'react-hooks/exhaustive-deps': [2]
  },
  settings: {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "src/"]
      }
    }
  },
  "env": {
    "browser": true,
    "node": true,
  }
}
