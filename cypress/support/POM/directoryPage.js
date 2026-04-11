class DirectoryPage {
    openDirectoryMenu() {
        cy.contains('Directory').click()
    }

    searchByName(name) {
        cy.get('input[placeholder="Type for hints..."]').type(name)
    }

    clickSearch() {
        cy.get('button[type="submit"]').should('be.visible').click()
    }

    clickReset() {
        cy.get('.oxd-button--ghost').should('be.visible').click()
    }

    clickDirectorycard() {
        cy.get('.oxd-sheet').should('have.length.greaterThan', 0)
    }

    clickEmployeecard() {
        cy.get('.oxd-sheet').first().click()
        cy.get('.orangehrm-directory-card-header').should('be.visible')
    }
    
    verifyJobtitlefilter() {
        cy.get('.oxd-select-text').eq(0).click()
        cy.contains('Chief Executive Officer').click()
    }

    verifyLocationfilter() {
        cy.get('.oxd-select-text').eq(1).click()
        cy.contains('HQ - CA, USA').click()
    }

    verify2filter() {
        cy.get('input[placeholder="Type for hints..."]').type('Paul')

        cy.get('.oxd-select-text').eq(0).click()
        cy.contains('Chief Executive Officer').click()
    }

    verifyVisible() {
        cy.contains('Directory').should('be.visible')
    }

    verifyResult() {
        cy.get('.oxd-table-card').should('exist') 
    }

    verifySuccessDirectory() {
        cy.url().should('include', '/directory')
    }

    visitDirectory() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
            failOnStatusCode: false,
            timeout: 120000,
        })

        cy.wait(5000)
        cy.get('[name="username"]', { timeout: 20000 }).should('be.visible').type('Admin')
        cy.get('[name="password"]').type('admin123')

        cy.intercept('GET', '**/dashboard/**').as('dashboard')
        cy.get('button[type="submit"]').click()
        cy.wait('@dashboard')

        cy.intercept('GET', '**/directory/**').as('directoryPage')
        cy.contains('Directory').click()
        cy.wait('@directoryPage')
    }




}

export default new DirectoryPage()
