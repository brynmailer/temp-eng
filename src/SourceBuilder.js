class SourceBuilder {
  constructor(indentLevel = 0) {
    this.source = [];
    this.indentLevel = indentLevel;

    this.INDENT_SPACES = 2;
  }

  addLine(line) {
    this.source.concat([' ' * this.indentLevel, line, '\n'])
  }

  addSection() {
    const section = new SourceBuilder(this.indentLevel);
    this.source.push(section);
    return section;
  }

  indent() {
    this.indentLevel += this.INDENT_SPACES;
  }

  dedent() {
    this.indentLevel -= this.INDENT_SPACES;
  }

  toString() {
    return this.source.map(line => line.toString());
  }

  getGlobals
}
