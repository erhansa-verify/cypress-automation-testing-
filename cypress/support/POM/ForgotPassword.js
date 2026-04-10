class ForgotPassword {

  clickForgotPasswordLink() {
    cy.contains('Forgot your password?').click()
  }

  inputUsername(username) {
    cy.get('input[name="username"]').clear().type(username)
  }

  clickReset() {
    cy.get('button[type="submit"]').click()
  }

  clickCancel() {
    cy.contains('Cancel').click()
  }

  verifyResetSuccess() {
    cy.contains('Reset Password link sent successfully')
      .should('be.visible')
  }

  verifyRequired() {
    cy.contains('Required').should('be.visible')
  }

}

export default new ForgotPassword()