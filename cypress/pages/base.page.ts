///<reference types="cypress" />

abstract class BasePage {
    protected static get uri(): string {
        return ''
    }
    
    public static visit() {
        cy.visit(this.uri)
    
        return this
    }
}

export default BasePage