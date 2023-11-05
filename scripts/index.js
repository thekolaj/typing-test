import checkUserInput from "./checkUserInput.js";
import Stats from "./stats.js";
import Archive from "./archive.js";
import elements from "./elements.js";

// Values:
let stats
const archive = new Archive()

// Events:
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') resetTest()
  else if (event.key === 'Enter') startNewTest()
  else elements.inputField.focus()
})
elements.inputField.addEventListener('input', checkUserInput)
elements.newTestBtn.addEventListener('click', startNewTest)
elements.restartBtn.addEventListener('click', resetTest)

async function startNewTest() {
  await elements.updateCurrentText()
  resetTest()
}

function endTest() {
  elements.inputField.setAttribute('disabled', true)
  const testResult = stats.calculateFinalStats()
  if (archive.allResults.length) {
    const lastResult = archive.allResults.slice(-1)[0]
    stats.updateStatsWithDifference(testResult[3], testResult[4], lastResult[3], lastResult[4])
  } else archive.toggleResultsDisplay('hidden')
  archive.addResultToTopRow(testResult)
  archive.saveResults(testResult)
}

function resetTest() {
  elements.inputField.value = ''
  elements.inputField.removeAttribute('disabled')
  checkUserInput()
  if (stats) stats.removeTimer()
  stats = new Stats(endTest)
}

startNewTest()
