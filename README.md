# temp-engine
A simple, minimal HTML templating engine.

## Syntax
### Variable Substitution
```html
<div>This is a variable -> {{ variable_name }}</div>
```

### Conditionals
```html
{ #if (variable === false) }
<div>I will be rendered if the condition evaluates to true</div>
{ #else }
<div>Otherwise I will be rendered</div>
{ #endif }
```

## Usage
```javascript
import { Template }from '@bryn-mailer/temp-eng';

const template = new Template('pathToTemplate.html');
const html = template.generateHTML({
  variable: 'value'
});
```
