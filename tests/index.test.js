import { Template } from '../src/index';

test('template gets created properly', () => {
  expect(new Template('tests/variables.html')).toBeInstanceOf(Template);
});

test('variables get properly substituted in', () => {
  expect(new Template('tests/variables.html').generateHTML({ variable_name: 'test' }))
    .toBe('<div>test</div>');
});

test('if statements render the correct markup', () => {
  expect(new Template('tests/conditionals.html').generateHTML({ variable_name: true }))
    .toBe('<div>true</div>');
});

test('else statements render the correct markup', () => {
  expect(new Template('tests/conditionals.html').generateHTML({ variable_name: false }))
    .toBe('<div>false</div>');
});

test('nested if statements render the correct markup', () => {
  expect(new Template('tests/nested-conditionals.html').generateHTML({
    variable_name: true,
    variable: true
  }))
    .toBe('<div>true</div><div>true</div>');
});

test('nested else statements render the correct markup', () => {
  expect(new Template('tests/nested-conditionals.html').generateHTML({
    variable_name: true,
    variable: false
  }))
    .toBe('<div>true</div><div>false</div>');
});
