class LoginPage {
    visitPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }
    inputUsername(username) {
        cy.get('input[name="username"]').type(username);
    }
    inputPassword(password) {
        cy.get('input[name="password"]').type(password);
    }
    clickLogin() {
        cy.get('button[type="submit"]').click();
    }
    verifyLogin() {
        cy.url().should('include', 'dashboard');
    }
 
}
export default new LoginPage;