import { configureStore } from '@reduxjs/toolkit';
import orderReducer, { fetchOrderByNumber } from '../ordersSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      order: orderReducer
    }
  });

describe('Проверка экшенов для заказов', () => {
  describe('Тестирование экшена получения заказа по номеру', () => {
    test('Проверка состояния при ожидании ответа по запросу заказа', () => {
      const store = createTestStore();
      store.dispatch({ type: fetchOrderByNumber.pending.type });
      const currentState = store.getState();
      expect(currentState.order.loading).toBe(true);
      expect(currentState.order.error).toBeNull();
    });

    test('Проверка состояния при ошибке запроса заказа', () => {
      const store = createTestStore();
      const mockError = 'mocked error';
      store.dispatch({
        type: fetchOrderByNumber.rejected.type,
        error: { message: mockError }
      });
      const currentState = store.getState();
      expect(currentState.order.loading).toBe(false);
      expect(currentState.order.error).toBe(mockError);
    });

    test('Проверка состояния при успешном ответе по запросу заказа', () => {
      const mockResponse = {
        orders: [
          {
            _id: '1234567890abcdef12345678',
            ingredients: [
              '9876543210fedcba09876543',
              '9876543210fedcba09876542'
            ],
            owner: 'me',
            status: 'done',
            name: 'Galactic Double Cheese Burger',
            createdAt: '2024-05-01T14:25:30.100Z',
            updatedAt: '2024-05-01T14:30:10.100Z',
            number: 47912
          }
        ]
      };
      const store = createTestStore();
      store.dispatch({
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockResponse
      });
      const currentState = store.getState();
      expect(currentState.order.loading).toBe(false);
      expect(currentState.order.error).toBeNull();
      expect(currentState.order.order).toEqual(mockResponse.orders[0]);
    });
  });
});
