
import LoginPage from "../../support/POM/Loginpage1";
import LoginData from "../../fixtures/LoginData.json"; 
import DirectoryPage from "../../support/POM/directoryPage.js"; 
import directoryPage from "../../support/POM/directoryPage.js";

describe('OrangeHRM - Directory Feature', () => {

     beforeEach(() => {
        LoginPage.visitPage()
        cy.intercept('GET', '**/api/v2/dashboard/employees/action-summary')
        .as('dashboard')
        LoginPage.inputUsername(LoginData.validusername)
        LoginPage.inputPassword(LoginData.validpassword)
        LoginPage.clickLogin()
        cy.wait('@dashboard').its('response.statusCode').should('eq', 200)
        LoginPage.verifyLogin()
        cy.contains('Directory').click()
    })
  
    it('DT-001 Verifikasi halaman direktori', () => {
        DirectoryPage.verifySuccessDirectory()
        DirectoryPage.verifyVisible()
    }) 

    it('DT-002 Verifikasi tombol search', () => {
        DirectoryPage.clickSearch()
        cy.wait('@directoryPage')
    })

    it('DT-003 Verifikasi tombol Reset', () => {
        directoryPage.clickReset()
        cy.wait('@directoryPage')
    })

    it('DT-004 Verifikasi tampil directory card', () => {
        directoryPage.clickDirectorycard()
    })

    it('DT-005 Verifikasi job title filter', () => {
        directoryPage.verifyJobtitlefilter()
        directoryPage.clickSearch()

        cy.wait('@directoryPage')
    })

    it('DT-006 Verifikasi location Filter', () => {
        directoryPage.verifyLocationfilter()
        directoryPage.clickSearch()

        cy.wait('@directoryPage')
    })  

    it('DT-007 Verifikasi beberapa filter', () => {
        directoryPage.verify2filter()
        directoryPage.clickSearch()

        cy.wait('@directoryPage')
    }) 

    it('DT-008 Verifikasi employee card', () => {
        directoryPage.clickEmployeecard()
    }) 

    it('DT-009 Pencarian tidak valid (kosong)', () => {
        directoryPage.clickSearch()

        cy.wait('@directoryPage')
    })



    
})