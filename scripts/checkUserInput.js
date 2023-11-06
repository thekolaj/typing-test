import elements, { currentTextElements } from "./elements.js"

/** Compares user input with current text letter by letter.
 * Adds color to highligh correct/incorrect letters and highlights next letter.
 */
export default function checkUserInput() {
  const userInput = elements.inputField.value
  for (let i = 0; i < currentTextElements.length; i++) {
    const userCharacter = userInput.charAt(i)
    if (!userCharacter) {
      currentTextElements[i].className = ''
    } else if (userCharacter === currentTextElements[i].innerText) {
      currentTextElements[i].className = 'positive-color'
    } else {
      currentTextElements[i].className = 'negative-color'
    }
  }
  currentTextElements[userInput.length].className = 'active'
}
