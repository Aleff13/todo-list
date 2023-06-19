///<reference types="cypress" />

import User from '../types/user';
import BasePage from './base.page';

class Login extends BasePage {
    static get uri(){
        return '/'
    }

    static fillUsername(username: string): string {
        cy.getByTestId('username-login-form').type(username)
        return username
    }

    static fillPassword(password: string): string {
        cy.getByTestId('password-login-form').type(password)
        return password
    }

    static clickSign(): void {
        cy.getByTestId('sign-btn-login-form').click()
    }

    static fillNativeFields({username, password}: User) {
        this.fillUsername(username)
        this.fillPassword(password)
    }

    static login({username, password}: User) {
        this.fillNativeFields({username, password})
        this.clickSign()
    }
}

export default Login