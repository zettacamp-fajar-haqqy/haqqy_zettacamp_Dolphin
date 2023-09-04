import cypressConfig from "cypress.config"

/* function randomAdd(){
  const menu = ["Latte", "Cappucino", "Espresso", "On The Rock"]

  const x = Math.floor((Math.random() * 4))

  cy.get('.card-body h2').contains(menu[x]).siblings('button').click()

}

function checkTotal(num){
  do{
    randomAdd()
  }while(num < 60)
} */

beforeEach(() => {
  cy.visit('http://localhost:4200/')
})

afterEach(() => {
  cy.get('.navbar-end').get('button').get('[data-cy="btn-logout"]').click()
})

describe('Login, Checkout and Logout', () => {

  it('should allow users to log in', () => {
    cy.get('input[type=text]').type('haki')
    cy.get('input[type=password]').type('haki123')
    cy.wait(2000)
    cy.get('button').contains('Login').click()
  })

  it('should allow users to add some items', () => {
    cy.wait(2000)
    cy.get('input[type=text]').type('haqqy')
    cy.get('input[type=password]').type('haki123')
    cy.wait(2000)
    cy.get('button').contains('Login').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('Latte').siblings('button').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('Cappucino').siblings('button').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('Espresso').siblings('button').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('On The Rock').siblings('button').click()
    cy.wait(3000)
  })

  it('should allow users to remove some items', () => {
    cy.wait(2000)
    cy.get('input[type=text]').type('haki')
    cy.get('input[type=password]').type('haki123')
    cy.wait(3000)
    cy.get('button').contains('Login').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('Latte').siblings('button').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('Latte').siblings('button').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('On The Rock').siblings('button').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('On The Rock').siblings('button').click()
    cy.wait(1000)
    cy.get('[data-cy="cart-item"]').get('[data-cy="text-cart-item-name"]').contains('Latte').siblings('button').click()
    cy.wait(2000)
    cy.get('[data-cy="cart-item"]').get('[data-cy="text-cart-item-name"]').contains('On The Rock').siblings('button').click()
    cy.wait(3000)
  })

  it('should allow users to checkout items', () => {
    cy.wait(2000)
    cy.get('input[type=text]').type('haki')
    cy.get('input[type=password]').type('haki123')
    cy.wait(2000)
    cy.get('button').contains('Login').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('Latte').siblings('button').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('Latte').siblings('button').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('Cappucino').siblings('button').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('Espresso').siblings('button').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('Espresso').siblings('button').click()
    cy.wait(1000)
    cy.get('.card-body h2').contains('On The Rock').siblings('button').click()
    cy.wait(2000)
    cy.get('[data-cy="cart-item"]').get('[data-cy="text-cart-item-name"]').contains('Cappucino').siblings('button').click()
    cy.wait(2000)
    cy.get('[data-cy="cart-item"]').get('[data-cy="text-cart-item-name"]').contains('On The Rock').siblings('button').click()
    cy.wait(2000)
    cy.get('.card-actions').get('button').get('[data-cy="btn-checkout"]').click()
    cy.wait(3000)
  })

  /* it('should allow cypress to add some random items', () =>{
    cy.get('input[type=text]').type('haki')
    cy.get('input[type=password]').type('haki123')
    cy.wait(2000)
    cy.get('button').contains('Login').click()
    cy.wait(3000)
    randomAdd()
    cy.wait(3000)
    cy.contains('button', /Checkout Rp\d+/).invoke('text').then((buttonText) => {
      const numericValue = parseFloat(buttonText.match(/\d+/)[0]);
      checkTotal(numericValue)
    });
    cy.wait(5000)
  }) */

})
