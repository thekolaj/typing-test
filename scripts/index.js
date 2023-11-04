import getRandomText from "./getRandomText.js";
import checkUserInput from "./checkUserInput.js";
import Stats from "./stats.js";


// Elements:
const inputField = document.querySelector('.input-field')
const textDisplay = document.querySelector('#text-display')

// Values:
let allTextElements
let stats

// Events:
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') startNewTest()
  else if (event.key === 'Enter') resetTest()
  else inputField.focus()
})
inputField.addEventListener('input', () => checkUserInput(inputField.value, allTextElements))
document.querySelector('#restart').addEventListener('click', startNewTest)
document.querySelector('#reset').addEventListener('click', resetTest)

async function startNewTest() {
  const text = await getRandomText()
  textDisplay.innerHTML = text.split('').reduce((fullText, currentCharacter) => {
    return fullText + `<span>${currentCharacter}</span>`
  }, '')
  allTextElements = textDisplay.querySelectorAll('span')
  resetTest()
}

function endTest() {
  inputField.setAttribute('disabled', true)
}

function resetTest() {
  inputField.value = ''
  inputField.removeAttribute('disabled')
  checkUserInput(inputField.value, allTextElements)
  if (stats) stats.removeTimer()
  stats = new Stats(endTest)
}

startNewTest()
