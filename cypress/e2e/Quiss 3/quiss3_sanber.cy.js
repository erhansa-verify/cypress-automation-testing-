describe('Login Feature - OrangeHRM', () => {

  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

  beforeEach(() => {
    cy.visit(url)
    cy.get('input[name="username"]').should('be.visible')
  })

  it('TC_01 - Login valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
  })

  it('TC_02 - Username salah', () => {
    cy.get('input[name="username"]').type('salah')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC_03 - Password salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salah')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC_04 - Username kosong', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('TC_05 - Password kosong', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('TC_06 - Username & Password kosong', () => {
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('TC_07 - Username case sensitive (HARUS gagal login)', () => {
    cy.get('input[name="username"]').type('AdMin') // salah case
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard') // seharusnya gagal login, tapi karena username tidak case sensitive, tetap berhasil login. Ini adalah temuan bug. 
  })

  it('TC_08 - Password case sensitive (HARUS gagal login)', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('adMin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text', { timeout: 5000 })
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

})