// Settings:
const file = 'texts.json'
const maxTime = 60;

// Elements:
const inputField = document.querySelector('.input-field')
const textDisplay = document.querySelector('.text-display')

// Events:
document.addEventListener('keydown', event => {
  inputField.focus()
  if (event.key === 'Escape') console.log(inputField)
  if (event.key === 'Enter') startNewTest()
})
inputField.addEventListener('input', checkUserInput)

function checkUserInput() {
  const fullText = textDisplay.querySelectorAll('span')
  const userInput = inputField.value
  for (let i = 0; i < fullText.length; i++) {
    const userCharacter = userInput.charAt(i)
    if (!userCharacter) {
      fullText[i].className = ''
    } else if (userCharacter === fullText[i].innerText) {
      fullText[i].className = 'correct'
    } else {
      fullText[i].className = 'incorrect'
    }
  }
  fullText[userInput.length].className = 'active'
}

/**
 * Get random text from file
 * @param {string} file Path to JSON file with array of texts.
 * @returns {string}
 */
async function getRandomText(file) {
   return fetch(file)
    .then(res => res.json())
    .then(data => data[Math.floor(Math.random() * data.length)])
    .catch(() => 'Error! Could not open file: ' + file)
}

async function startNewTest() {
  const text = await getRandomText(file)
  textDisplay.innerHTML = text.split('').reduce((fullText, currentCharacter) => {
    return fullText + `<span>${currentCharacter}</span>`
  }, '')
  textDisplay.querySelector('span').classList.add('active')
  inputField.value = ''
}

startNewTest()