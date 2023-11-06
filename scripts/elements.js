import { filePath } from "../settings.js"

// All of the elements the app uses
const inputField = document.querySelector('#input-field')
const textDisplay = document.querySelector('#text-display')
const newTestBtn = document.querySelector('#new-test')
const restartBtn = document.querySelector('#restart')
const startMessage = document.querySelector('#start-message')
const timerDisplay = document.querySelector('#timer')
const wpmBlock = document.querySelector('#wpm-block')
const wpmDisplay = wpmBlock.querySelector('#wpm')
const accuracyDisplay = document.querySelector('#accuracy')
const statsHeader = document.querySelector('#stats-header')
const noResultsMessage = document.querySelector('#no-data')


/** Gets a new text. Splits it into chars with <span> elements.
 * Saves them all into currentTextElements
 */
async function updateCurrentText() {
  const text = await getRandomText(filePath)
  textDisplay.innerHTML = text.split('').reduce(
    (fullText, currentCharacter) => fullText + `<span>${currentCharacter}</span>`, '')
  currentTextElements = textDisplay.querySelectorAll('span')
}

/** Get random text from file
 * @param {string} file Path to JSON file with array of texts.
 * @returns {Promise<string>}
 */
function getRandomText(file) {
  return fetch(file)
    .then(res => res.json())
    .then(data => data[Math.floor(Math.random() * data.length)])
    .catch(() => 'Error! Could not open file: ' + file)
}

/** @type {NodeList} all texts chars with in spans. Fill by calling updateCurrentText. */
export let currentTextElements

export default {
  inputField,
  textDisplay,
  newTestBtn,
  restartBtn,
  startMessage,
  timerDisplay,
  wpmBlock,
  wpmDisplay,
  accuracyDisplay,
  statsHeader,
  noResultsMessage,
  updateCurrentText,
}