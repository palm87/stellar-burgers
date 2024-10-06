import authReducer, { setAuthChecked, setUser, TAuthState } from '../authSlice';

// Начальное состояние
const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  error: null
};

describe('authSlice reducer tests', () => {
  it('должен установить флаг isAuthChecked через setAuthChecked', () => {
    const state = authReducer(initialState, setAuthChecked(true));
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен установить пользователя через setUser', () => {
    const user = { id: '1', email: 'test@test.com', name: 'Ivan' }; // Мокированные данные пользователя
    const state = authReducer(initialState, setUser(user));
    expect(state.user).toEqual(user);
  });
});
