import {
  PayloadAction,
  createSelector,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface IConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        switch (action.payload.type) {
          case 'bun':
            state.bun = action.payload;
            break;
          default:
            state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredients: TIngredient) => ({
        payload: { ...ingredients, id: nanoid() }
      })
    },

    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) => {
      const { index, direction } = action.payload;
      const step = direction === 'up' ? -1 : 1; // Определяем шаг в зависимости от направления
      const targetIndex = index + step;

      if (targetIndex >= 0 && targetIndex < state.ingredients.length) {
        // Меняем местами ингредиенты
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[targetIndex];
        state.ingredients[targetIndex] = temp;
      }
    },

    clearIngredients: (state) => (state = initialState)
  },
  selectors: {
    getBurger: (state) => state,
    getIngredients: (state) => state.ingredients,
    getAllIngredients: createSelector(
      (state) => state,
      (state) => {
        const { bun, ingredients } = state;
        const bunArray = bun ? [bun] : [];
        return [...bunArray, ...ingredients];
      }
    )
  }
});

export const { getBurger, getIngredients, getAllIngredients } =
  constructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  clearIngredients,
  moveIngredient
} = constructorSlice.actions;

export default constructorSlice.reducer;
