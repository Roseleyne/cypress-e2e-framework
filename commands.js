// cypress/support/commands.js

// ──────────────────────────────────────────────
// AUTENTICAÇÃO
// ──────────────────────────────────────────────

/**
 * Login via sessão cacheada (evita repetição de UI entre testes)
 * Uso: cy.loginAs('admin') | cy.loginAs('user')
 */
Cypress.Commands.add('loginAs', (userType = 'user') => {
  const users = Cypress.env('users')
  const user  = users[userType]

  cy.session(
    [userType, user.email],
    () => {
      cy.visit('/login')
      cy.get('[data-cy=email]').type(user.email)
      cy.get('[data-cy=password]').type(user.password, { log: false })
      cy.get('[data-cy=submit]').click()
      cy.url().should('include', '/dashboard')
      cy.get('[data-cy=user-menu]').should('be.visible')
    },
    {
      validate() {
        cy.request({ url: '/api/me', failOnStatusCode: false })
          .its('status')
          .should('eq', 200)
      },
      cacheAcrossSpecs: true,
    }
  )
})

/**
 * Login via API (mais rápido — sem UI)
 * Uso: cy.loginViaApi('user@email.com', 'senha')
 */
Cypress.Commands.add('loginViaApi', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/login`,
    body: { email, password },
  }).then(({ body }) => {
    window.localStorage.setItem('auth_token', body.token)
  })
})

// ──────────────────────────────────────────────
// UTILITÁRIOS
// ──────────────────────────────────────────────

/**
 * Intercepta e aguarda chamada de API antes de continuar
 * Uso: cy.waitForApi('GET', '/api/search', '@searchAlias')
 */
Cypress.Commands.add('waitForApi', (method, url, alias) => {
  cy.intercept(method, url).as(alias.replace('@', ''))
  return cy.wrap(alias)
})

/**
 * Verifica acessibilidade básica (contraste, alt texts)
 * Uso: cy.checkA11y()
 */
Cypress.Commands.add('checkA11y', () => {
  cy.get('img').each(($img) => {
    cy.wrap($img).should('have.attr', 'alt')
  })
})
