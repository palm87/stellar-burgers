import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

// Определим пример данных для тестов
const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Ingredient 1',
    type: 'bun',
    proteins: 12,
    fat: 20,
    carbohydrates: 50,
    calories: 200,
    price: 100,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url'
  },
  {
    _id: '2',
    name: 'Ingredient 2',
    type: 'main',
    proteins: 25,
    fat: 15,
    carbohydrates: 30,
    calories: 300,
    price: 200,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url'
  }
];

describe('ingredientsSlice reducer', () => {
  // Тестируем начальное состояние
  it('должен возвращать начальное состояние', () => {
    const initialState = {
      ingredients: [],
      loading: false,
      error: null
    };

    expect(ingredientsReducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    );
  });

  // Тестируем поведение при экшене pending
  it('должен установить loading в true при вызове fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(undefined, action);

    expect(state).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });

  // Тестируем поведение при экшене fulfilled
  it('должен обновить store.ingredients и установить loading в false при вызове fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(undefined, action);

    expect(state).toEqual({
      ingredients: mockIngredients,
      loading: false,
      error: null
    });
  });

  // Тестируем поведение при экшене rejected
  it('должен записать ошибку в store.error и установить loading в false при вызове fetchIngredients.rejected', () => {
    const mockError = 'Error occurred';
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: mockError }
    };
    const state = ingredientsReducer(undefined, action);

    expect(state).toEqual({
      ingredients: [],
      loading: false,
      error: mockError
    });
  });
});
