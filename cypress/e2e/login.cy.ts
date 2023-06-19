import Login from '../pages/login.page'
import User from '../types/user'

const user: User = Object.freeze({username: Cypress.env('username'), password: Cypress.env('password')})

describe('Login page', () => {
    it('Fill native fields and login', () => {
        Login.visit()
        Login.login(user)
    })
})