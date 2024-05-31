import ShoppingCartPage from '../Component/ShoppingCart-Component/ShoppingCartaPage';
import InventoryPage from '../Component/Inventory-Component/InventoryPage';
import LoginPage from '../Component/Login-Component/LoginPage';


describe('Cart Tests', () => {
  const shopping = new ShoppingCartPage();
  const inventoryPage = new InventoryPage();
  const loginPage = new LoginPage();

  beforeEach(() => {
    
    
    
    loginPage.visit();
    loginPage.fillUsername('standard_user');
    loginPage.fillPassword('secret_sauce');
    loginPage.submit();
    
    inventoryPage.getProductCards().first().find('button').click();
    inventoryPage.getProductCards().eq(1).find('button').click();
    
    cy.get('.shopping_cart_link').click();
  });

  it('should display all added items in the cart', () => {
    shopping.getCartItems().should('have.length', 2); 
  });

  it('should allow user to remove an item from the cart', () => {
    shopping.removeItem('Sauce Labs Backpack');
    shopping.getCartItems().should('have.length', 1);
  });

  it('should allow user to continue shopping', () => {
    shopping.getContinueShoppingButton().click();
    cy.url().should('include', '/inventory.html');
  });

  it('should allow user to navigate to checkout', () => {
    shopping.getCheckoutButton().click();
    cy.url().should('include', '/checkout-step-one.html');
  });

  it('should update the cart badge when an item is removed', () => {
    shopping.removeItem('Sauce Labs Backpack');
    cy.get('.shopping_cart_badge').should('contain', 1);
  });
});