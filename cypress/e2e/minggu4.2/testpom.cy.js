import LoginPage from "../../support/LoginPage";
import LoginData from "../../fixtures/LoginData.json";

describe('Verifikasi fungsi login', () => {

  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    beforeEach(() => {  
    cy.visit(url)
    cy.get('input[name="username"]').should('be.visible')
  })

  it('TC_01 - Login valid', () => {
    LoginPage.visitPage()
    LoginPage.inputUsername(LoginData.validusername)
    LoginPage.inputPassword(LoginData.validpassword)
    LoginPage.clickLogin()
    LoginPage.verifyLogin()
 
  })

  it('TC_02 - Username salah', () => {
    LoginPage.visitPage()
    LoginPage.inputUsername(LoginData.invalidusername) 
    LoginPage.inputPassword(LoginData.validpassword)
    LoginPage.clickLogin()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC_03 - Password salah', () => {
    LoginPage.visitPage()
    LoginPage.inputUsername(LoginData.validusername)
    LoginPage.inputPassword(LoginData.invalidpassword)
    LoginPage.clickLogin()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC_04 - Username kosong', () => {
    LoginPage.visitPage()
    LoginPage.inputPassword(LoginData.validpassword)
    LoginPage.clickLogin()

    cy.contains('Required').should('be.visible')
  })

  it('TC_05 - Password kosong', () => {
    LoginPage.visitPage()
    LoginPage.inputUsername(LoginData.validusername)
    LoginPage.clickLogin()

    cy.contains('Required').should('be.visible')
  })

  it('TC_06 - Username & Password kosong', () => {
    LoginPage.visitPage()
    LoginPage.clickLogin()

    cy.contains('Required').should('be.visible')
  })

  it('TC_07 - Username case sensitive (HARUS gagal login)', () => {
    LoginPage.visitPage()
    LoginPage.inputUsername('AdMin') // salah case
    LoginPage.inputPassword(LoginData.validpassword)
    LoginPage.clickLogin()
    cy.url().should('include', '/dashboard') // seharusnya gagal login, tapi karena username tidak case sensitive, tetap berhasil login. Ini adalah temuan bug.

    
    
  })

  it('TC_08 - Password case sensitive (HARUS gagal login)', () => {
    LoginPage.visitPage()
    LoginPage.inputUsername(LoginData.validusername)
    LoginPage.inputPassword('adMin123') // salah case
    LoginPage.clickLogin()
    cy.contains('Invalid credentials').should('be.visible') // seharusnya gagal login, dan karena password memang case sensitive, maka muncul pesan error "Invalid credentials". Ini adalah hasil yang diharapkan.
        


  })

})
