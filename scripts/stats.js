import { maxTime } from "../settings.js"

export default class Stats {
  static timerDisplay = document.querySelector('#timer')
  static wpmDisplay = document.querySelector('#wpm')
  static accuracyDisplay = document.querySelector('#accuracy')

  constructor(allTextElements) {
    this.allTextElements = allTextElements
    this.intervalEventID = false
    this.timeLeft = maxTime
    Stats.timerDisplay.innerText = maxTime
    Stats.wpmDisplay.innerText = 0
    Stats.accuracyDisplay.innerText = 100
  }

  startTimer() {
    this.intervalEventID = setInterval(() => {
      this.timeLeft--
      Stats.timerDisplay.innerText = this.timeLeft
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.intervalEventID)
    this.intervalEventID = false
  }
}