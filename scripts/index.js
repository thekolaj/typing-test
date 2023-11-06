import checkUserInput from "./checkUserInput.js";
import Stats from "./stats.js";
import Archive from "./archive.js";
import elements from "./elements.js";

// Values:
/** @type {Stats} Calculates stats. Recreated for each new test */
let stats
/** @type {Archive} Stores test results. Created once. */
const archive = new Archive()

// Events:
// For every key press except 'Escape' or 'Enter', auto-focus on an invisible input field.
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') resetTest()
  else if (event.key === 'Enter') startNewTest()
  else elements.inputField.focus()
})
// When something changes in the input field, update text to reflect that change.
elements.inputField.addEventListener('input', checkUserInput)
// Make buttons active.
elements.newTestBtn.addEventListener('click', startNewTest)
elements.restartBtn.addEventListener('click', resetTest)

/** Wait for text to load. Then reset the test. */
async function startNewTest() {
  await elements.updateCurrentText()
  resetTest()
}

/** Reset user input field. Remove highlights from text.
 * Remove timer in case the test was not finished.
 * Resets stats.
 */
function resetTest() {
  elements.inputField.value = ''
  elements.inputField.removeAttribute('disabled')
  checkUserInput()
  if (stats) stats.removeTimer()
  stats = new Stats(endTest)
}

/** Stop the test: Disable input, get, display and archive test result */
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

// Start a new test when page loads.
startNewTest()
