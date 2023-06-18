import test from 'node:test';
import assert from 'node:assert';
import os from 'node:os';
import {asciiBox, boxChars} from './asciibox.mjs';

const {tl, tr, h, v, bl, br} = boxChars;

function toInputString(...lines) {
  return lines.join(os.EOL);
}

test('box with width', () => {
    assert.strictEqual(asciiBox(toInputString(`${tl}${h}${tr}`,`${bl}${h}${br}`)), 1);
});

test('box with height', () => {
  assert.strictEqual(asciiBox(toInputString(`${tl}${tr}`,`${v}${v}`,`${bl}${br}`)), 1);
});

test('small box', () => {
  assert.strictEqual(asciiBox(toInputString(`${tl}${tr}`, `${bl}${br}`)), 1);
});

test('broke box', () => {
  assert.strictEqual(asciiBox(toInputString(`${tl} ${tr}`,`${bl}${br}`)), 0);
});

test('missing line', () => {
  assert.strictEqual(asciiBox(`${tl}${tr}${bl}${br}`), 0);
});

// s

