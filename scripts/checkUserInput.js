export default function checkUserInput(userInput, allTextElements) {
  for (let i = 0; i < allTextElements.length; i++) {
    const userCharacter = userInput.charAt(i)
    if (!userCharacter) {
      allTextElements[i].className = ''
    } else if (userCharacter === allTextElements[i].innerText) {
      allTextElements[i].className = 'correct'
    } else {
      allTextElements[i].className = 'incorrect'
    }
  }
  allTextElements[userInput.length].className = 'active'
}
