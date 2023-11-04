import getRandomText from "./getRandomText.js";
import checkUserInput from "./checkUserInput.js";
import Stats from "./stats.js";
import Archive from "./archive.js";


// Elements:
const inputField = document.querySelector('#input-field')
const textDisplay = document.querySelector('#text-display')

// Values:
let allTextElements
let stats
const archive = new Archive()

// Events:
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') resetTest()
  else if (event.key === 'Enter') startNewTest()
  else inputField.focus()
})
inputField.addEventListener('input', () => checkUserInput(inputField.value, allTextElements))
document.querySelector('#new-test').addEventListener('click', startNewTest)
document.querySelector('#restart').addEventListener('click', resetTest)

async function startNewTest() {
  const text = await getRandomText()
  textDisplay.innerHTML = text.split('').reduce(
    (fullText, currentCharacter) => fullText + `<span>${currentCharacter}</span>`, '')
  allTextElements = textDisplay.querySelectorAll('span')
  resetTest()
}

function endTest() {
  inputField.setAttribute('disabled', true)
  const testResult = stats.calculateFinalStats()
  if (archive.allResults.length) {
    const lastResult = archive.allResults.slice(-1)[0]
    Stats.updateStatsWithDifference(testResult[3], testResult[4], lastResult[3], lastResult[4])
  } else archive.toggleResultsDisplay('hidden')
  archive.addResultToTopRow(testResult)
  archive.saveResults(testResult)
}

function resetTest() {
  inputField.value = ''
  inputField.removeAttribute('disabled')
  checkUserInput(inputField.value, allTextElements)
  if (stats) stats.removeTimer()
  stats = new Stats(endTest)
}

startNewTest()
