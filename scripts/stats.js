import { maxTime } from "../settings.js"


export default class Stats {
  static timerDisplay = document.querySelector('#timer')
  static wpmDisplay = document.querySelector('#wpm')
  static accuracyDisplay = document.querySelector('#accuracy')
  static textDisplay = document.querySelector('#text-display')
  static inputField = document.querySelector('#input-field')

  constructor(endTest) {
    this.endTest = endTest
    this.intervalEventID = false
    this.timeLeft = maxTime
    Stats.timerDisplay.innerText = maxTime
    Stats.wpmDisplay.innerText = 0
    Stats.accuracyDisplay.innerText = 100
    Stats.inputField.addEventListener('input', this.startTimer, { once: true })
  }

  startTimer = () => {
    this.intervalEventID = setInterval(() => {
      this.timeLeft--
      Stats.updateStatsDisplay(this.timeLeft, ...this.calculateStats(maxTime - this.timeLeft))
      if (this.timeLeft === 0) {
        this.removeTimer()
        this.endTest()
      }
    }, 1000)
  }

  removeTimer() {
    if (this.intervalEventID) clearInterval(this.intervalEventID)
    else Stats.inputField.removeEventListener('input', this.startTimer)
    this.intervalEventID = false
  }

  calculateStats(timeElapsed) {
    const charactersTyped = Stats.inputField.value.length
    const charactersCorrect = Stats.textDisplay.querySelectorAll('.correct').length
    const accuracy = charactersTyped ? Math.round((100*charactersCorrect) / charactersTyped) : 100
    const wpm = Math.round((charactersCorrect / 5) / ((timeElapsed) / 60))
    return [wpm, accuracy]
  }

  calculateFinalStats() {
    const [date, time] = new Date().toISOString().split('T')
    return [date, time.split('.')[0], maxTime, ...this.calculateStats(maxTime)]
  }

  static updateStatsWithDifference(newWpm, newAccuracy, oldWpm, oldAccuracy) {
    this.timerDisplay.innerHTML = '<span class="correct">Finish!</span>'
    const wpmDifference = this.addColorCode(newWpm - oldWpm)
    const accuracyDifference = this.addColorCode(newAccuracy - oldAccuracy)
    this.wpmDisplay.innerHTML = `${newWpm} (${wpmDifference})`
    this.accuracyDisplay.innerHTML = `${newAccuracy} (${accuracyDifference})`
  }

  static updateStatsDisplay(time, wpm, accuracy) {
    this.timerDisplay.innerText = time
    this.wpmDisplay.innerText = wpm
    this.accuracyDisplay.innerText = accuracy
  }

  static addColorCode(number) {
    if (number > 0) return `<span class="correct">+${number}</span>`
    else if (number < 0)  return `<span class="incorrect">${number}</span>`
    else return '0'
  }
}
