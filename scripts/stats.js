import { maxTime } from "../settings.js"

export default class Stats {
  static timerDisplay = document.querySelector('#timer')
  static wpmDisplay = document.querySelector('#wpm')
  static accuracyDisplay = document.querySelector('#accuracy')
  static textDisplay = document.querySelector('#text-display')
  static inputField = document.querySelector('.input-field')

  constructor() {
    this.intervalEventID = false
    this.timeLeft = maxTime
    Stats.timerDisplay.innerText = maxTime
    Stats.wpmDisplay.innerText = 0
    Stats.accuracyDisplay.innerText = 100
  }

  startTimer() {
    this.intervalEventID = setInterval(() => {
      this.timeLeft--
      Stats.updateStatsDisplay(this.timeLeft, ...this.returnStats())
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.intervalEventID)
    this.intervalEventID = false
  }

  returnStats() {
    const charactersTyped = Stats.inputField.value.length
    const charactersCorrect = Stats.textDisplay.querySelectorAll('.correct').length
    const accuracy = charactersTyped ? Math.round((100 * charactersCorrect) / charactersTyped) : 100
    const wpm = Math.round((charactersCorrect / 5) / ((maxTime - this.timeLeft) / 60))
    return [wpm, accuracy]
  }

  static updateStatsDisplay(time, wpm, accuracy) {
    this.timerDisplay.innerText = time
    this.wpmDisplay.innerText = wpm
    this.accuracyDisplay.innerText = accuracy
  }


}