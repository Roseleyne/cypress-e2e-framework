// cypress/e2e/auth/login.cy.js

import LoginPage from '../../pages/LoginPage'

describe('Autenticação — Login', () => {

  context('Happy path', () => {
    it('deve fazer login com credenciais válidas', () => {
      LoginPage.login(
        Cypress.env('users').user.email,
        Cypress.env('users').user.password
      )
      cy.url().should('include', '/dashboard')
      cy.get('[data-cy=user-menu]').should('be.visible')
    })

    it('deve manter sessão após reload da página', () => {
      cy.loginAs('user')
      cy.visit('/dashboard')
      cy.reload()
      cy.get('[data-cy=user-menu]').should('be.visible')
    })
  })

  context('Cenários negativos', () => {
    beforeEach(() => LoginPage.visit())

    it('deve exibir erro com senha incorreta', () => {
      LoginPage.fillEmail('usuario@teste.com')
      LoginPage.fillPassword('senha_errada')
      LoginPage.submit()
      LoginPage.assertErrorVisible('Credenciais inválidas')
    })

    it('deve exibir erro com email não cadastrado', () => {
      LoginPage.fillEmail('nao_existe@teste.com')
      LoginPage.fillPassword('qualquer_senha')
      LoginPage.submit()
      LoginPage.assertErrorVisible('Usuário não encontrado')
    })

    it('deve bloquear login após 5 tentativas falhas', () => {
      Cypress._.times(5, () => {
        LoginPage.fillEmail('usuario@teste.com')
        LoginPage.fillPassword('senha_errada')
        LoginPage.submit()
      })
      LoginPage.assertErrorVisible('Conta temporariamente bloqueada')
    })
  })

  context('Validação de campos', () => {
    beforeEach(() => LoginPage.visit())

    it('deve exibir erro ao submeter formulário vazio', () => {
      LoginPage.submit()
      cy.get('[data-cy=email-error]').should('be.visible')
      cy.get('[data-cy=password-error]').should('be.visible')
    })

    it('deve rejeitar formato de email inválido', () => {
      LoginPage.fillEmail('email_invalido')
      LoginPage.fillPassword('senha123')
      LoginPage.submit()
      cy.get('[data-cy=email-error]').should('contain', 'Email inválido')
    })
  })
})
