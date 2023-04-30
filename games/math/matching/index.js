function getTarget() {
  return 50 * randomNumber(1, 2);
}

/**
 * gets a random number between start and end
 * @param {number} start the smallest number possible
 * @param {number} end   the biggest number possible 
 * @returns {number}     a random number
 */
function randomNumber(start, end) {
  const range = (end + 1) - start;
  const rand = Math.random();
  return Math.floor(rand * range)+start;
}

/**
 * generate a set of pairs that sum to target
 * @param {number} target target sum
 */
function generateAddends(target) {
  const addends = [];
  for (let i = 0; i < 8; i++) {
    addends.push(randomNumber(0, target));
  }
  const len = addends.length;
  for (let i = 0; i < len; i++) {
    addends.push(target - addends[i]);
  }
  return addends;
}