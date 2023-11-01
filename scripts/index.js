// Elements:
const inputField = document.querySelector('.input-field')
const textDisplay = document.querySelector('.text-display')

// Events:
document.addEventListener('keydown', event => {
  inputField.focus()
  if (event.key === 'Escape') console.log(inputField)
  if (event.key === 'Enter') console.log(textDisplay)
})


fetch('texts.json')
  .then(res => res.json())
  .then(data => {
    const text = data[Math.floor(Math.random() * data.length)]
    const textWithHtml = text.split('').reduce((fullText, currentCharacter) => {
      return fullText + `<span>${currentCharacter}</span>`
    }, '')


    textDisplay.innerHTML = textWithHtml
  })