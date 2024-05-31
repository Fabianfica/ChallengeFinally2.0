import CheckoutPage from '../Component/Checkout-Component/CheckoutPage';
import ShoppingCartPage from '../Component/ShoppingCart-Component/ShoppingCartaPage';
import InventoryPage from '../Component/Inventory-Component/InventoryPage';
import LoginPage from '../Component/Login-Component/LoginPage';

describe('Checkout Tests', () => {
  const checkoutPage = new CheckoutPage();
  const shopping = new ShoppingCartPage();
  const inventoryPage = new InventoryPage();
  const loginPage = new LoginPage();

  beforeEach(() => {
    
    
    
    loginPage.visit();
    loginPage.fillUsername('standard_user');
    loginPage.fillPassword('secret_sauce');
    loginPage.submit();
    
    
    inventoryPage.getProductCards().first().find('button').click();
    cy.get('.shopping_cart_link').click();
    shopping.getCheckoutButton().click();
  });

  it('should require first name', () => {
    checkoutPage.fillLastName('Doe');
    checkoutPage.fillPostalCode('12345');
    checkoutPage.continueCheckout();
    checkoutPage.getErrorMessage().should('contain', 'Error');
  });

  it('should require last name', () => {
    checkoutPage.fillFirstName('John');
    checkoutPage.fillPostalCode('12345');
    checkoutPage.continueCheckout();
    checkoutPage.getErrorMessage().should('contain', 'Error');
  });

  it('should require postal code', () => {
    checkoutPage.fillFirstName('John');
    checkoutPage.fillLastName('Doe');
    checkoutPage.continueCheckout();
    checkoutPage.getErrorMessage().should('contain', 'Error');
  });

  it('should navigate to the checkout overview page on successful information submission', () => {
    checkoutPage.fillFirstName('John');
    checkoutPage.fillLastName('Doe');
    checkoutPage.fillPostalCode('12345');
    checkoutPage.continueCheckout();
    cy.url().should('include', '/checkout-step-two.html');
  });

  it('should complete the checkout process', () => {
    checkoutPage.fillFirstName('John');
    checkoutPage.fillLastName('Doe');
    checkoutPage.fillPostalCode('12345');
    checkoutPage.continueCheckout();
    checkoutPage.finishCheckout();
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  });
});
