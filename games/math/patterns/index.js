const patternLength = 10;
const main = document.getElementById('main');
const pattern = makePattern(randomNumber());
main.innerHTML = pattern.join(", ");

function makePattern(countBy) {
  const start = randomNumber();
  const list = [];
  for (let i = 0; i < patternLength; i++) {
    list.push(start + (i * countBy));
  }
  return list;
}
function randomNumber() {
  const start = 1;
  const end = 100;
  const range = end - start;
  const rand = Math.random();
  return Math.floor(rand * range);
}