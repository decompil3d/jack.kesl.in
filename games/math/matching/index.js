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
  return addends.sort(() => randomNumber(-1, 1));
}

function handleClick(/** @type {MouseEvent} */ evt) {
  if (!firstSelection) {
     const cell = firstSelection = evt.target;
     cell.classList.add('selected');
  } else {
    const cell = evt.target;
    if (cell === firstSelection) {
      cell.classList.remove('selected');
      firstSelection = null;
      return;
    }
    const firstNumber = parseInt(firstSelection.innerText, 10);
    const secondNumber = parseInt(cell.innerText);
    if (firstNumber + secondNumber === target) {
      setCorrect([firstSelection, cell]);
      firstSelection = null;
      openCells -= 2;
      if (openCells === 2) {
        setCorrect(document.querySelectorAll('td button:not(.correct)'));
        youWin();
      }
    } else {
       firstSelection.classList.remove('selected');
       firstSelection.classList.add('wrong');
       cell.classList.add('wrong');
       const first = firstSelection;
       setTimeout(() => {
        first.classList.remove('wrong');
        cell.classList.remove('wrong');
       }, 2_000);
       firstSelection = null;
    }
  }
}

let target;
let openCells;
function render() {
  const html = [];
  target = getTarget();
  const addends = generateAddends(target);
  openCells = addends.length;
  const sideSize = Math.sqrt(addends.length);
  if (!Number.isInteger(sideSize)) {
    throw new Error('addends length not square');
  }
  html.push('<p>Find pairs of numbers that add up to <strong>', target, '</strong>.</p>');
  html.push('<table>');
  let k = 0;
  for (let i = 0; i < sideSize; i++) {
    html.push('<tr>');
    for (let j = 0; j < sideSize; j++) {
      html.push('<td>');
      html.push('<button type="button" onclick="handleClick">');
      html.push(addends[k++]);
      html.push('</button>');
      html.push('</td>');
    }
    html.push('</tr>');
  }
  html.push('</table>');

  const main = document.getElementById('main');
  main.innerHTML = html.join('');
  firstSelection = null;
}

function setCorrect(elms) {
  elms.forEach(element => {
    element.classList.add('correct');
    element.disabled = true;
  });
}

function youWin() {
  
}

let firstSelection = null;
render();
