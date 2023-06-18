import os from 'node:os';

export const boxChars = {
  tl: "┍",
  tr: "┐",
  h: "─",
  v: "│",
  bl: "└",
  br: "┘"
};

const {tl, tr, h, v, bl, br} = boxChars;

class Lines {
  lines = new Map();

  add(start, end, rowCol) {
    if (!this.lines.has(start)) this.lines.set(start, new Map());
    if (!this.lines.get(start).has(end)) this.lines.get(start).set(end, new Map());

    this.lines.get(start).get(end).set(rowCol, true);
  }

  getNearesetRow(start, end) {
    if (!this.lines.has(start)) return -1;
    if (!this.lines.get(start).has(end)) return -1;

    return Array.from(this.lines.get(start).get(end).keys()).pop();
  }
}

export function asciiBox(input) {
  let row = 0;
  let col = 0;
  let startOfRow = 0;
  let tlIndex = -1;
  let blIndex = -1;

  const startsOfRows = [0];
  const topLines = new Lines();
  const topBottoms = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    // New line character
    if (char === "\n") {
      row++;
      startOfRow = i + 1;
      startsOfRows.push(startOfRow);
      col = 0;
      tlIndex = -1;
      blIndex = -1;
      // skip this character
      continue;
    }

    // we already have a top left corner
    if (tlIndex > -1) {
      // we found top right corner and can complete the top line
      if (char === tr) {
        topLines.add(tlIndex, col, row);
        tlIndex = -1;
      } else if (char !== h) {
        tlIndex = -1;
      }
    } else if (char === tl) {
      tlIndex = col;
    }

    // we already have a bottom left corner
    if (blIndex > -1) {
      // we found bottom right corner and can complete the bottom line
      if (char === br) {
        // check if bottom line has top line above it
        const topRow = topLines.getNearesetRow(blIndex, col);
        if (topRow > -1) {
          topBottoms.push([topRow, blIndex, row, col]);
        }
        blIndex = -1;
      } else if (char !== h) {
        blIndex = -1;
      }
    } else if (char === bl) {
      blIndex = col;
    }

    col++;
  }

  if (topBottoms.length === 0) return 0;

  function hasVerticalLines([topRow, leftCol, bottomRow, rightCol]) {
    for (let r = topRow + 1; r < bottomRow; r++) {
      const idxLeft = startsOfRows[r] + leftCol;
      const idxRight = startsOfRows[r] + rightCol;
      if (input[idxLeft] !== v || input[idxRight] !== v) return false;
    }

    return true;
  }

  for (let pair of topBottoms) {
    if (hasVerticalLines(pair)) return 1;
  }

  return 0;
}

