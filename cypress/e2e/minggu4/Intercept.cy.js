describe('Verifikasi fungsi login', () => {

  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

  beforeEach(() => {
    cy.visit(url)
    cy.get('input[name="username"]').should('be.visible')
  })

  it('TC_01 - Login valid', () => {

    cy.intercept('GET', '**/api/v2/dashboard/employees/action-summary')
      .as('dashboard')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@dashboard').its('response.statusCode').should('eq', 200)

    cy.url().should('include', '/dashboard')
  })

  it('TC_02 - Username salah', () => {

    cy.intercept('POST', '**/auth/validate')
      .as('loginRequest')

    cy.get('input[name="username"]').type('salah')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest')

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('TC_03 - Password salah', () => {

    cy.intercept('POST', '**/auth/validate')
      .as('loginFail')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salah')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginFail')

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('TC_04 - Username kosong', () => {

    cy.intercept('GET', '**/web/index.php/auth/login')
      .as('loginPage')

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('TC_05 - Password kosong', () => {

    cy.intercept('POST', '**/auth/validate')
      .as('loginTry')

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()


    cy.contains('Required').should('be.visible')
  })
  
  it('TC_06 - Username & Password kosong', () => {

    cy.intercept('GET', '**/web/index.php/**')
      .as('pageLoad')

    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })
    
  it('TC_07 - Username case sensitivity', () => {

    cy.intercept('POST', '**/auth/**')
      .as('authAll')

    cy.get('input[name="username"]').type('AdMin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@authAll')

    cy.url().should('include', '/dashboard')
  })

  it('TC_08 - Password case sensitive', () => {

    cy.intercept('POST', '**/auth/validate')
      .as('loginCase')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('adMin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginCase')

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

})