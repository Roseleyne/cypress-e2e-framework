// cypress/pages/LoginPage.js

class LoginPage {
  // Seletores
  get emailInput()    { return cy.get('[data-cy=email]') }
  get passwordInput() { return cy.get('[data-cy=password]') }
  get submitBtn()     { return cy.get('[data-cy=submit]') }
  get errorMessage()  { return cy.get('[data-cy=error-message]') }

  visit() {
    cy.visit('/login')
  }

  fillEmail(email) {
    this.emailInput.clear().type(email)
  }

  fillPassword(password) {
    this.passwordInput.clear().type(password, { log: false })
  }

  submit() {
    this.submitBtn.click()
  }

  login(email, password) {
    this.visit()
    this.fillEmail(email)
    this.fillPassword(password)
    this.submit()
  }

  assertErrorVisible(message) {
    this.errorMessage.should('be.visible').and('contain.text', message)
  }
}

export default new LoginPage()
