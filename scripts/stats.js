import { maxTime } from "../settings.js"
import elements from "./elements.js"


export default class Stats {
  constructor(endTest) {
    this.endTest = endTest
    this.intervalEventID = false
    this.timeLeft = maxTime
    elements.timerDisplay.innerText = maxTime
    elements.wpmDisplay.innerText = 0
    elements.accuracyDisplay.innerText = 100
    elements.inputField.addEventListener('input', this.startTimer, { once: true })
    elements.wpmBlock.setAttribute('hidden', true)
    elements.startMessage.removeAttribute('hidden')
  }

  startTimer = () => {
    elements.wpmBlock.removeAttribute('hidden')
    elements.startMessage.setAttribute('hidden', true)
    this.intervalEventID = setInterval(() => {
      this.timeLeft--
      this.#updateStatsDisplay(this.timeLeft, ...this.#calculateStats(maxTime - this.timeLeft))
      if (this.timeLeft === 0) {
        this.removeTimer()
        this.endTest()
      }
    }, 1000)
  }

  removeTimer() {
    if (this.intervalEventID) clearInterval(this.intervalEventID)
    else elements.inputField.removeEventListener('input', this.startTimer)
    this.intervalEventID = false
  }

  #calculateStats(timeElapsed) {
    const charactersTyped = elements.inputField.value.length
    const charactersCorrect = elements.textDisplay.querySelectorAll('.positive-color').length
    const accuracy = charactersTyped ? Math.round((100 * charactersCorrect) / charactersTyped) : 100
    const wpm = Math.round((charactersCorrect / 5) / ((timeElapsed) / 60))
    return [wpm, accuracy]
  }

  calculateFinalStats() {
    const [date, time] = new Date().toISOString().split('T')
    return [date, time.split('.')[0], maxTime, ...this.#calculateStats(maxTime)]
  }

  updateStatsWithDifference(newWpm, newAccuracy, oldWpm, oldAccuracy) {
    elements.timerDisplay.innerHTML = '<span class="positive-color">Finish!</span>'
    const wpmDifference = this.#addColorCode(newWpm - oldWpm)
    const accuracyDifference = this.#addColorCode(newAccuracy - oldAccuracy)
    elements.wpmDisplay.innerHTML = `${newWpm} (${wpmDifference})`
    elements.accuracyDisplay.innerHTML = `${newAccuracy} (${accuracyDifference})`
  }

  #updateStatsDisplay(time, wpm, accuracy) {
    elements.timerDisplay.innerText = time
    elements.wpmDisplay.innerText = wpm
    elements.accuracyDisplay.innerText = accuracy
  }

  #addColorCode(number) {
    if (number > 0) return `<span class="positive-color">+${number}</span>`
    else if (number < 0) return `<span class="negative-color">${number}</span>`
    else return '<span class="neutral-color">0</span>'
  }
}
