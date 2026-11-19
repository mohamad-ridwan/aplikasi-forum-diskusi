/**
 * Test scenario for Login E2E Flow:
 *
 * - Login spec
 *  - should display login page elements correctly
 *  - should display validation notification when email is empty
 *  - should display notification when password is empty
 *  - should display error toast when given wrong credentials
 *  - should redirect to homepage and show auth navbar when login success
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.intercept('GET', '**/v1/users/me', (req) => {
      const authHeader = req.headers.authorization || '';
      if (authHeader.includes('cypress-auth-jwt-token')) {
        req.reply({
          statusCode: 200,
          body: {
            status: 'success',
            message: 'ok',
            data: {
              user: {
                id: 'user-cypress',
                name: 'Cypress Tester',
                email: 'cypress@example.com',
                avatar: 'https://ui-avatars.com/api/?name=Cypress+Tester',
              },
            },
          },
        });
      } else {
        req.reply({
          statusCode: 401,
          body: {
            status: 'fail',
            message: 'Missing authentication',
          },
        });
      }
    }).as('getProfile');
    cy.visit('/login');
  });

  it('should display login page elements correctly', () => {
    // memverifikasi elemen input email, password, dan tombol submit tampil
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Masuk Sekarang').should('be.visible');
  });

  it('should display validation notification when email is empty', () => {
    // klik tombol submit tanpa mengisi email
    cy.get('button[type="submit"]').contains('Masuk Sekarang').click();

    // memverifikasi validasi HTML5 constraint form
    cy.get('input[type="email"]:invalid').should('exist');
    cy.get('input[type="email"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
  });

  it('should display notification when password is empty', () => {
    // mengisi email saja
    cy.get('input[type="email"]').type('pengguna@example.com');

    // klik tombol submit tanpa mengisi kata sandi
    cy.get('button[type="submit"]').contains('Masuk Sekarang').click();

    // memverifikasi validasi HTML5 constraint form pada field password
    cy.get('input[type="password"]:invalid').should('exist');
    cy.get('input[type="password"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
  });

  it('should display error toast when given wrong credentials', () => {
    // stub respons API login gagal
    cy.intercept('POST', '**/v1/login', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'email or password is wrong',
      },
    }).as('loginFail');

    // mengisi form dengan kredensial salah
    cy.get('input[type="email"]').type('user-salah@example.com');
    cy.get('input[type="password"]').type('passwordsalah123');

    // klik tombol submit
    cy.get('button[type="submit"]').contains('Masuk Sekarang').click();

    // tunggu panggilan API dan verifikasi toast notifikasi muncul
    cy.wait('@loginFail');
    cy.get('[role="alert"]')
      .should('be.visible')
      .and('contain', 'email or password is wrong');
  });

  it('should redirect to homepage and show auth navbar when login success', () => {
    // stub respons API login sukses
    cy.intercept('POST', '**/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          token: 'cypress-auth-jwt-token',
        },
      },
    }).as('loginSuccess');

    // isi form dengan kredensial valid
    cy.get('input[type="email"]').should('be.visible').type('cypress@example.com');
    cy.get('input[type="password"]').should('be.visible').type('rahasia123');

    // klik submit
    cy.get('button[type="submit"]').contains('Masuk Sekarang').click();

    // tunggu intercept request
    cy.wait('@loginSuccess');
    cy.wait('@getProfile');

    // verifikasi redirect ke homepage
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    // verifikasi elemen profil dan tombol logout di navbar
    cy.get('header').should('contain', 'Cypress Tester');
    cy.get('button[aria-label="Logout"]').should('be.visible');
  });
});
