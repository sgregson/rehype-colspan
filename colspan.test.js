'use strict';

var unified = require('unified');
var parse = require('rehype-parse');
var stringify = require('rehype-stringify');

var colspan = require('./colspan.js');

describe('colspan', () => {
  const tester = unified()
    .use(parse, {fragment: true})
    .use(colspan)
    .use(stringify);

  it('no colspan', () => {
    const input = '<table><tbody><tr><td>skipped</td></tr></tbody></table>';

    return tester.process(input).then(output => {
      expect(String(output)).toBe(input)
    })
  })

  it('strip empty colspan', () => {
    const input = '<table><tbody><tr><td colspan>skipped</td></tr></tbody></table>',
      processed = '<table><tbody><tr><td>skipped</td></tr></tbody></table>';

    return tester.process(input).then(output => {
      expect(String(output)).toBe(processed)
    })
  })

  it('td[colspan=2]', () => {
    const input = '<table><tbody><tr><td>yo</td><td colspan="2">contents</td><td></td></tr></tbody></table>',
      processed = '<table><tbody><tr><td>yo</td><td>contents</td><td></td><td></td></tr></tbody></table>';

    return tester.process(input).then(output => {
      expect(String(output)).toBe(processed);
    })
  });

  it('th[colspan=3]', () => {
    const input = '<table><tbody><tr><td>yo</td><th colspan="3">contents</th><td></td></tr></tbody></table>',
      processed = '<table><tbody><tr><td>yo</td><th>contents</th><th></th><th></th><td></td></tr></tbody></table>';

    return tester.process(input).then(output => {
      expect(String(output)).toBe(processed);
    })
  });
});
