# babel-plugin-transform-html-import-require-to-string

Turn HTML imports and requires into string vars. Make your transpiled code as verbose as this package name!

Inspired by https://github.com/yeiniel/babel-plugin-transform-html-import-to-string

## Example

Given a file `assets/template.html`
```
<h1>Hello</h1>
```

Transform your imports
```
import template from "/assets/template.html"
const requiredTemplate = require("/assets/template.html)
```
to
```
var template = "<h1>Hello</h1>"
const requiredTemplate = "<h1>Hello</h1>"
```

## Installation
Install with your package manager of choice
```
yarn add babel-plugin-transform-html-import-require-to-string
```

Then use as per usual...

### Via `.babelrc`
```
{
  "plugins": ["transform-html-import-require-to-string"]
}
```

### Via CLI
```
$ babel --plugins transform-html-import-require-to-string script
```

### Via Node API
```
require("babel-core").transform("code", {
  plugins: ["transform-html-import-require-to-string"]
});
```