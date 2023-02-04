const patternLength = 10;
const numBlanks = 3;
const main = document.getElementById('main');
const pattern = makePattern(randomNumber(1, 10));
const blankIndices = getBlankIndices();
main.innerHTML = renderPattern(pattern, blankIndices);

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

/**
 * renders pattern HTML
 * @param {number[]} pattern list of numbers
 * @param {number[]} blankIndices blank positions
 * @returns {string} rendered HTML
 */
function renderPattern(pattern, blankIndices) {
  return pattern.map((p, i) => {
    if (blankIndices.includes(i)) {
      return `<input type="number" id="blank${i}" min="1" max="139" />`;
    } else {
      return `<span>${p}</span>`;
    }
  }).join(' ');
}

function checkWork() {
  if (checkAnswers()) {
    alert('you win');
  } else {
    alert('not quite');
  }
}

/**
 * check answers & highlight boxes
 * @returns {boolean} true if all answers are correct, false otherwise
 */
function checkAnswers() {
  return blankIndices.every(b => {
    /** @type {HTMLInputElement} */
    const box = document.getElementById(`blank${b}`);
    const answer = box.value;
    if (answer == pattern[b]) {
      return true;
    }
    return false;
  });
}