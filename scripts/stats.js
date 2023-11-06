import { maxTime } from "../settings.js"
import elements from "./elements.js"

/** Timer, WPM, Accuracy calculation and display */
export default class Stats {
  /** Resets all stats during creation.
   * @param {function} endTest callback function that ends the test when time runs out */
  constructor(endTest) {
    this.endTest = endTest
    this.intervalEventID = false
    this.timeLeft = maxTime
    elements.timerDisplay.innerText = maxTime
    elements.wpmDisplay.innerText = 0
    elements.accuracyDisplay.innerText = 100
    elements.inputField.addEventListener('input', this.startTimer, { once: true })
    // Hide WPM. Display start message.
    elements.wpmBlock.setAttribute('hidden', true)
    elements.startMessage.removeAttribute('hidden')
  }
  /** Starts the test */
  startTimer = () => {
    // Hide start message. Displays WPM.
    elements.wpmBlock.removeAttribute('hidden')
    elements.startMessage.setAttribute('hidden', true)
    // This event will stop the test once the timer reaches 0. Otherwise, updates stats display
    this.intervalEventID = setInterval(() => {
      this.timeLeft--
      this.#updateStatsDisplay(this.timeLeft, ...this.#calculateStats(maxTime - this.timeLeft))
      if (this.timeLeft === 0) {
        this.removeTimer()
        this.endTest()
      }
    }, 1000)
  }

  /** Removes timer if started or the event that would have started it */
  removeTimer() {
    if (this.intervalEventID) clearInterval(this.intervalEventID)
    else elements.inputField.removeEventListener('input', this.startTimer)
    this.intervalEventID = false
  }

  /** calculates wpm and accuracy based on time, length of users inputField
   * and elements marked as correct on the textDisplay. With this formula,
   * wrongly typed characters do not count towards WPM.
   * @param {number} timeElapsed Time since test began or just maxTime if it ended.
   */
  #calculateStats(timeElapsed) {
    const charactersTyped = elements.inputField.value.length
    const charactersCorrect = elements.textDisplay.querySelectorAll('.positive-color').length
    const accuracy = charactersTyped ? Math.round((100 * charactersCorrect) / charactersTyped) : 100
    const wpm = Math.round((charactersCorrect / 5) / ((timeElapsed) / 60))
    return [wpm, accuracy]
  }

  /**
   * Creates final test stats that can be archived.
   * @returns {[string,string,number,number,number]} current date, time, test time(s), WPM, accuracy
   */
  calculateFinalStats() {
    const [date, time] = new Date().toISOString().split('T')
    return [date, time.split('.')[0], maxTime, ...this.#calculateStats(maxTime)]
  }

  /** Display stats with comparison to the previous test scores (color coded) */
  updateStatsWithDifference(newWpm, newAccuracy, oldWpm, oldAccuracy) {
    elements.timerDisplay.innerHTML = '<span class="positive-color">Finish!</span>'
    const wpmDifference = this.#addColorCode(newWpm - oldWpm)
    const accuracyDifference = this.#addColorCode(newAccuracy - oldAccuracy)
    elements.wpmDisplay.innerHTML = `${newWpm} (${wpmDifference})`
    elements.accuracyDisplay.innerHTML = `${newAccuracy} (${accuracyDifference})`
  }

  /**
   * Update stats display
   * @param {number|string} time current time left or finish message
   * @param {number|string} wpm current WPM
   * @param {number|string} accuracy current accuracy
   */
  #updateStatsDisplay(time, wpm, accuracy) {
    elements.timerDisplay.innerText = time
    elements.wpmDisplay.innerText = wpm
    elements.accuracyDisplay.innerText = accuracy
  }

  /** Add a span with a color class based on the numbers value
   * @param {number} number number to add color to.
   * @returns {string}
   */
  #addColorCode(number) {
    if (number > 0) return `<span class="positive-color">+${number}</span>`
    else if (number < 0) return `<span class="negative-color">${number}</span>`
    else return '<span class="neutral-color">0</span>'
  }
}
