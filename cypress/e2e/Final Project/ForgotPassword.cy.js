import LoginPage from "../../support/POM/Loginpage1";
import ForgotPassword from "../../support/POM/ForgotPassword";
import LoginData from "../../fixtures/LoginData.json";

describe('Forgot Password Test', () => {
const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login' 
  beforeEach(() => {
    LoginPage.visitPage()
    ForgotPassword.clickForgotPasswordLink()
  })

  it('TC_01 - Username valid', () => {

    cy.intercept('POST', '**/auth/requestPasswordResetCode').as('resetValid')

    ForgotPassword.inputUsername(LoginData.validusername)
    ForgotPassword.clickReset()

    cy.wait('@resetValid')
    ForgotPassword.verifyResetSuccess()
  })

it('TC_02 - Username kosong', () => {

  ForgotPassword.clickReset()

  ForgotPassword.verifyRequired()

})
  it('TC_03 - Klik cancel', () => {

    cy.intercept('GET', '**/auth/login').as('backLogin')

    ForgotPassword.clickCancel()

    cy.wait('@backLogin')
    cy.url().should('include', '/login')
  })

})  