// cypress/pages/SearchPage.js

class SearchPage {
  get searchInput()   { return cy.get('[data-cy=search-input]') }
  get searchBtn()     { return cy.get('[data-cy=search-btn]') }
  get resultItems()   { return cy.get('[data-cy=result-item]') }
  get noResults()     { return cy.get('[data-cy=no-results]') }
  get loadingSpinner(){ return cy.get('[data-cy=loading]') }

  visit() {
    cy.visit('/search')
  }

  searchFor(term) {
    this.searchInput.clear().type(term)
    this.searchBtn.click()
    this.loadingSpinner.should('not.exist')
  }

  getResultCount() {
    return this.resultItems.its('length')
  }

  getFirstResult() {
    return this.resultItems.first()
  }

  assertResultsVisible() {
    this.resultItems.should('have.length.greaterThan', 0)
  }

  assertNoResultsVisible() {
    this.noResults.should('be.visible')
  }
}

export default new SearchPage()
