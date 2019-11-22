module.exports = {
  extends: 'airbnb',
  rules: {
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx']
    }],
    'react/prop-types': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
    'camelcase': ['off'],
    'no-shadow': ['off']
  },
  settings: {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "src/"]
      }
    }
  }
}
