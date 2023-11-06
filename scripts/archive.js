import elements from "./elements.js"

/** Load and store result in local memory. Display them */
export default class Archive {
  allResults

  /** Load results during creation. */
  constructor() {
    this.loadResults()
  }

  /** Load results from local storage and render them in reverse order */
  loadResults() {
    this.allResults = JSON.parse(localStorage.getItem('allResults')) ?? []
    if (this.allResults.length) {
      for (const testResult of this.allResults) {
        this.addResultToTopRow(testResult)
      }
    } else this.toggleResultsDisplay()
  }

  /** Update local storage with all results after getting new once
   * @param {[number|string]} testResult
   */
  saveResults(testResult) {
    this.allResults.push(testResult)
    localStorage.setItem('allResults', JSON.stringify(this.allResults))
  }

  /** Insert results after header as table row
   * @param {[number|string]} testResult
   */
  addResultToTopRow(testResult) {
    const row = document.createElement('tr')
    row.innerHTML = testResult.reduce(
      (allColumns, currentColumn) => allColumns + `<td>${currentColumn}</td>`, '')
    elements.statsHeader.after(row)
  }

  /** Display/Hide message when there are no results in the archive */
  toggleResultsDisplay() {
    elements.statsHeader.toggleAttribute('hidden')
    elements.noResultsMessage.toggleAttribute('hidden')
  }
}
