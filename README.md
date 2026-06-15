# 🤖 Cypress E2E Automation Framework

> Framework de automação E2E com Cypress usando Page Object Model, Custom Commands e pipeline CI/CD via GitHub Actions.

![CI](https://github.com/Roseleyne/cypress-e2e-framework/actions/workflows/cypress.yml/badge.svg)
![Cypress](https://img.shields.io/badge/Cypress-17.0-04C38E?logo=cypress)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📋 Sobre o Projeto

Framework de automação de testes End-to-End construído com **Cypress**, aplicando boas práticas de engenharia de qualidade:

- Arquitetura **Page Object Model (POM)** para reusabilidade e manutenibilidade
- **Custom Commands** para abstrações de alto nível
- Execução automatizada via **GitHub Actions** em cada pull request
- Relatórios de execução com **Mochawesome**
- Cobertura de fluxos críticos: autenticação, busca, checkout e validação de dados

---

## 🛠️ Stack

| Camada | Tecnologia |
|---|---|
| Framework E2E | Cypress 13+ |
| Linguagem | JavaScript (ES6+) |
| Padrão | Page Object Model |
| CI/CD | GitHub Actions |
| Reports | Mochawesome |
| Linting | ESLint |

---

## 🏗️ Arquitetura

```
cypress-e2e-framework/
│
├── cypress/
│   ├── e2e/                    # Specs de teste organizadas por feature
│   │   ├── auth/
│   │   │   ├── login.cy.js
│   │   │   └── logout.cy.js
│   │   ├── search/
│   │   │   └── search-flights.cy.js
│   │   └── checkout/
│   │       └── booking-flow.cy.js
│   │
│   ├── pages/                  # Page Objects
│   │   ├── LoginPage.js
│   │   ├── SearchPage.js
│   │   └── CheckoutPage.js
│   │
│   ├── support/
│   │   ├── commands.js         # Custom Commands globais
│   │   └── e2e.js
│   │
│   └── fixtures/               # Dados de teste (JSON)
│       ├── users.json
│       └── search-data.json
│
├── .github/
│   └── workflows/
│       └── cypress.yml         # Pipeline CI/CD
│
├── cypress.config.js
├── package.json
└── README.md
```

---

## ⚡ Como Rodar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
git clone https://github.com/Roseleyne/cypress-e2e-framework.git
cd cypress-e2e-framework
npm install
```

### Execução

```bash
# Modo interativo (Cypress Test Runner)
npm run cy:open

# Modo headless (CI)
npm run cy:run

# Executar suite específica
npm run cy:run -- --spec "cypress/e2e/auth/**"

# Gerar relatório Mochawesome
npm run cy:report
```

---

## 🔄 Pipeline CI/CD

O workflow do GitHub Actions executa automaticamente em:
- Push na branch `main`
- Abertura de Pull Requests

```yaml
# .github/workflows/cypress.yml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cypress-io/github-action@v6
        with:
          browser: chrome
          headed: false
```

---

## 📊 Resultados

| Métrica | Valor |
|---|---|
| Cobertura de fluxos críticos | 85%+ |
| Tempo médio de execução | ~4 minutos |
| Flaky tests | < 2% |
| Ambientes cobertos | Dev, QA, Staging |

---

## 🧩 Exemplos de Código

### Custom Command — Login
```javascript
// cypress/support/commands.js
Cypress.Commands.add('loginAs', (userType) => {
  const user = Cypress.env('users')[userType]
  cy.session(userType, () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type(user.email)
    cy.get('[data-cy=password]').type(user.password)
    cy.get('[data-cy=submit]').click()
    cy.url().should('include', '/dashboard')
  })
})
```

### Page Object — SearchPage
```javascript
// cypress/pages/SearchPage.js
class SearchPage {
  visit() { cy.visit('/search') }
  searchFor(term) { cy.get('[data-cy=search-input]').type(term) }
  submit() { cy.get('[data-cy=search-btn]').click() }
  getResults() { return cy.get('[data-cy=result-item]') }
}
export default new SearchPage()
```

---

## 👩‍💻 Autora

**Roseleyne Duarte Silva** — Senior QA Engineer | SDET

- 🌐 [Portfolio](https://roseleyne.github.io/portfolio)
- 💼 [LinkedIn](https://www.linkedin.com/in/roseleyne-duarte-silva/)
- 🐙 [GitHub](https://github.com/Roseleyne)
- 📧 roseleyne.duarte@gmail.com
