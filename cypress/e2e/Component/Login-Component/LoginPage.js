// class LoginPage {
    

//     fillFormAndSubmit(user, password) {
//       //cy.get('#user-name').type(user);
//       //cy.get('#password').type(password);
//       //cy.get('#login-button').click();
//       Cy.get(‘[data-test="username"]’)
//       Cy.get(‘[data-test="password"]’)
//       Cy.get(‘[data-test="login-button"]’).click();

      
//     }
//   }
  
//   export default LoginPage;
class LoginPage {
    visit() {
      cy.visit('https://www.saucedemo.com'); // Ajustar a la URL correcta si es diferente
    }
  
    fillUsername(name) {
      cy.get('[data-test=username]').type(name);
    }
  
    fillPassword(password) {
      cy.get('[data-test=password]').type(password);
    }
  
    submit() {
      cy.get('[data-test=login-button]').click();
    }
  
    errorMessage() {
      return cy.get('[data-test=error]');
    }
  }
  
  export default LoginPage;