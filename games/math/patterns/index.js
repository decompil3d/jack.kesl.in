const patternLength = 10;
const numBlanks = 3;
const main = document.getElementById('main');
const pattern = makePattern(randomNumber(1, 10));
main.innerHTML = pattern.join(", ");

function makePattern(countBy) {
  const start = randomNumber(1, 50);
  const list = [];
  for (let i = 0; i < patternLength; i++) {
    list.push(start + (i * countBy));
  }
  return list;
}

/**
 * gets a random number between start and end
 * @param {number} start the smallest number possible
 * @param {number} end   the biggest number possible 
 * @returns {number}     a random number
 */
function randomNumber(start, end) {
  const range = end - start;
  const rand = Math.random();
  return Math.floor(rand * range);
}

function getBlankIndices() {
  /** @type {Set<number>} */
  const indices = new Set();
  while (indices.size < numBlanks) {
    indices.add(randomNumber(0, patternLength));
  }
  return Array.from(indices); 
}