export default class Archive {
  allResults

  constructor() {
    this.statsHeader = document.querySelector('#stats-header')
    this.noResultsMessage = document.querySelector('#no-data')
    this.loadResults()
  }

  loadResults() {
    this.allResults = JSON.parse(localStorage.getItem('allResults')) ?? []
    if (this.allResults.length) {
      for (const testResult of this.allResults) {
        this.addResultToTopRow(testResult)
      }
    } else this.toggleResultsDisplay()
  }

  saveResults(testResult) {
    this.allResults.push(testResult)
    localStorage.setItem('allResults', JSON.stringify(this.allResults))
  }

  addResultToTopRow(testResult) {
    const row = document.createElement('tr')
    row.innerHTML = testResult.reduce(
      (allColumns, currentColumn) => allColumns + `<td>${currentColumn}</td>`, '')
    this.statsHeader.after(row)
  }

  toggleResultsDisplay() {
    this.statsHeader.toggleAttribute('hidden')
    this.noResultsMessage.toggleAttribute('hidden')
  }
}
