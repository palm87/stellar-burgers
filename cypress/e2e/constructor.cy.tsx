describe('проверяем доступность приложения', function() {
  it('сервис должен быть доступен по адресу localhost:4000', function() {
      cy.visit('http://localhost:4000'); 
  });
});


describe('Сборка бургера', () => {
  const interceptEndpoints = () => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('makeOrder');
  };

  const setupUserSession = () => {
    cy.setCookie('accessToken', 'testToken');
    localStorage.setItem('refreshToken', 'testRefreshToken');
  }

  const visitApp = () => {
    cy.visit('/');

  };

  beforeEach(() => {
    interceptEndpoints();
    setupUserSession();
    visitApp();
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });



  describe('Добавление ингредиентов в бургер', () => {
    it('Должен добавить булки в бургер', () => {
      cy.get('[data-cy=BunAddButton]').contains('Добавить').click()
      cy.get('[data-cy=TopBunInConstructor]').should('contain', 'Краторная булка N-200i');
      cy.get('[data-cy=BottomBunInConstructor]').should('contain', 'Краторная булка N-200i');
    });

    it('Должен добавить начинку в бургер', () => {
      cy.get('[data-cy=IngredientAddButton]').contains('Добавить').click()
      cy.get('[data-cy=ConstructorItemsIngredients]').should('contain', 'Биокотлета из марсианской Магнолии');
    });

    it('Должен добавить соус в бургер', () => {
      cy.get('[data-cy=SauceAddButton]').contains('Добавить').click()
      cy.get('[data-cy=ConstructorItemsIngredients]').should('contain', 'Соус Spicy-X');
    });
  });


  describe('Модальные окна ингредиентов', () => {
    it('Должно открываться и закрываться модальное окно ингредиентов', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy=Modal]').contains('Краторная булка N-200i').should('be.visible');
      cy.get('[data-cy=CloseModalButton]').click().should('not.exist');
    });

  });

  describe('Создание заказа', () => {
    it('Должен отображаться пользователь', () => {
      cy.get('header').contains('Test').should('exist');
    });

    it('Должен успешно создать заказ', () => {
      cy.get('[data-cy=BunAddButton]').contains('Добавить').click()
      cy.get('[data-cy=IngredientAddButton]').contains('Добавить').click()
      cy.get('[data-cy=SauceAddButton]').contains('Добавить').click()
      cy.get('[type=button]').contains('Оформить заказ').click();
      cy.wait('@makeOrder', { timeout: 1000 })
        .its('response.statusCode')
        .should('eq', 200);

      cy.get('[data-cy=Modal]').should('be.visible');
      cy.get('[data-cy=Modal]').find('button').click().should('not.exist');

      cy.get('[data-cy=ConstructorItemsIngredients]')
        .should('contain', 'Выберите начинку')
    });
  });
});
