import constructorReducer, {
  addIngredient,
  removeIngredient,
  clearIngredients,
  moveIngredient
} from '../constructorSlice';
import { TIngredient } from '@utils-types';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'test-id')
}));

const mockIngredient: TIngredient = {
  _id: '1',
  name: 'Mock Ingredient',
  type: 'main',
  proteins: 12,
  fat: 15,
  carbohydrates: 10,
  calories: 200,
  price: 50,
  image: 'image-url',
  image_large: 'image-large-url',
  image_mobile: 'image-mobile-url'
};

describe('constructorSlice reducer', () => {
  // Тест обработки экшена добавления ингредиента
  it('должен добавить ингредиент в начинку', () => {
    const initialState = {
      bun: null,
      ingredients: []
    };

    const action = addIngredient(mockIngredient);
    const state = constructorReducer(initialState, action);

    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toEqual({
      ...mockIngredient,
      id: 'test-id'
    });
  });

  // Тест обработки экшена добавления булки
  it('должен добавить булку и перезаписать существующую булку', () => {
    const initialState = {
      bun: null,
      ingredients: []
    };

    const mockBun: TIngredient = {
      ...mockIngredient,
      type: 'bun'
    };

    const action = addIngredient(mockBun);
    const state = constructorReducer(initialState, action);

    expect(state.bun).toEqual({
      ...mockBun,
      id: 'test-id'
    });
    expect(state.ingredients.length).toBe(0);
  });

  // Тест обработки экшена удаления ингредиента
  it('должен удалить ингредиент по id', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: 'test-id-1' },
        { ...mockIngredient, id: 'test-id-2' }
      ]
    };

    const action = removeIngredient('test-id-1');
    const state = constructorReducer(initialState, action);

    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0].id).toBe('test-id-2');
  });

  // Тест очистки ингредиентов
  it('должен сбросить состояние до начального', () => {
    const initialState = {
      bun: { ...mockIngredient, type: 'bun', id: 'test-bun-id' },
      ingredients: [{ ...mockIngredient, id: 'test-id-1' }]
    };

    const action = clearIngredients();
    const state = constructorReducer(initialState, action);

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('Перемещение ингредиента в составе', () => {
    // Имитируем тестовые данные для ингредиентов
    const testIngredient1 = {
      id: 'abc123',
      _id: 'abc123',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 30,
      calories: 300,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    };

    const testIngredient2 = {
      id: 'xyz789',
      _id: 'xyz789',
      name: 'Филе Люминесцентного тетрагидриума',
      type: 'main',
      proteins: 44,
      fat: 10,
      carbohydrates: 99,
      calories: 510,
      price: 230,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };

    const initialState = {
      bun: null,
      ingredients: [testIngredient1, testIngredient2]
    };

    // Выполняем перемещение второго ингредиента на одну позицию вверх
    const newState = constructorReducer(
      initialState,
      moveIngredient({ index: 1, direction: 'up' })
    );

    // Ожидаем, что ингредиенты поменяются местами
    expect(newState.ingredients[0]).toEqual(testIngredient2);
    expect(newState.ingredients[1]).toEqual(testIngredient1);
  });
});
