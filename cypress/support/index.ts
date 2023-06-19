/// <reference types="cypress" />

declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * Custom command to select by data-testid attribute.
         */
        getByTestId(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
}
export {}