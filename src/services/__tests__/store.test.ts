import { rootReducer } from '../store';
import { feedsSlice } from '../feedSlice';
import { ingredientsSlice } from '../ingredientsSlice';
import { ordersSlice } from '../ordersSlice';
import { authSlice } from '../authSlice';
import { constructorSlice } from '../constructorSlice';

describe('rootReducer', () => {
  it('должен содержать все срезы (slices) в начальном состоянии', () => {
    // Инициализируем состояние с помощью rootReducer
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    // Проверяем наличие каждого среза в состоянии
    expect(initialState).toHaveProperty(feedsSlice.name);
    expect(initialState).toHaveProperty(ingredientsSlice.name);
    expect(initialState).toHaveProperty(ordersSlice.name);
    expect(initialState).toHaveProperty(authSlice.name);
    expect(initialState).toHaveProperty(constructorSlice.name);
  });

  it('должен сохранять неизменное состояние при неизвестном действии', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    const newState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });

    // Проверяем, что состояние не изменилось при неизвестном действии
    expect(newState).toBe(initialState);
  });
});
