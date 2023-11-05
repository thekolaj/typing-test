import elements from "./elements.js"

export default class Archive {
  allResults

  constructor() {
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
    elements.statsHeader.after(row)
  }

  toggleResultsDisplay() {
    elements.statsHeader.toggleAttribute('hidden')
    elements.noResultsMessage.toggleAttribute('hidden')
  }
}
