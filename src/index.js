import fs from 'fs'

export class Template {
  constructor(pathToTemplateFile) {
    this.template = fs.readFileSync(pathToTemplateFile)
      .toString()
      .replace(/ {2,}/g, '')
      .split(/\r?\n/g);
  }

  generateHTML(props) {
    let html = this.resolveConditionals(this.template, props)
      .join('');
    for (let key in props) {
      html = html.replace(new RegExp(`{{ ${key} }}`), props[key]);
    }
    return html;
  }

  resolveConditionals(template, props) {
    let ignore = false;
    let depth = 0;
    return template.filter(line => {
      if (!ignore) {
        if (line.search(/{ #if (.*) }/g) !== -1) {
          if (new Function(Object.keys(props).join(','), 'return ' + line.substring(7, line.length - 3))(...Object.values(props))) {
            depth++;
            return false;
          } else {
            ignore = true;
            return false;
          }
        } else if (line.search(/{ #endif }/g) !== -1) {
          depth--;
          return false;
        } else if (line.search(/{ #else }/g) !== -1){
          ignore = true;
          return false;
        } else {
          return true;
        }
      } else {
        if (line.search(/{ #endif }/g) !== -1) {
          depth--;
          if (depth > 1) {
            return false;
          } else {
            ignore = false;
            return false;
          }
        } else if (line.search(/{ #if (.*) }/g) !== -1) {
          depth++;
          return false;
        } else if (line.search(/{ #else }/g) !== -1) {
          if (depth > 1) {
            return false;
          } else {
            ignore = false;
            return false;
          }
        } else {
          return false;
        }
      }
    });
  }
}
