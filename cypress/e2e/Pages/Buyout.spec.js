import InventoryPage from '../Component/Inventory-Component/InventoryPage';
import ShoppingCartPage from '../Component/ShoppingCart-Component/ShoppingCartaPage';
import CheckoutPage from '../Component/Checkout-Component/CheckoutPage';
import LoginPage from '../Component/Login-Component/LoginPage';

describe('End-to-End Purchase Test', () => {
  const inventoryPage = new InventoryPage();
  const shopping = new ShoppingCartPage();
  const checkoutPage = new CheckoutPage();
  const loginPage = new LoginPage();

  it('should complete an E2E purchase flow', () => {
    
    loginPage.visit();
    loginPage.fillUsername('standard_user');
    loginPage.fillPassword('secret_sauce');
    loginPage.submit();

    inventoryPage.getProductCards().eq(0).find('button').click();
    inventoryPage.getProductCards().eq(1).find('button').click();
    inventoryPage.getProductCards().eq(2).find('button').click();

    cy.get('.shopping_cart_link').click();
    shopping.getCheckoutButton().click();

    checkoutPage.fillFirstName('Fabian');
    checkoutPage.fillLastName('Fica');
    checkoutPage.fillPostalCode('2024');
    checkoutPage.continueCheckout();

    checkoutPage.finishCheckout();

    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
    cy.get('.complete-text').should('contain', 'Your order has been dispatched');
  });
});

