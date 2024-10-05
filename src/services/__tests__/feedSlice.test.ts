import { getFeedsApi } from '@api';
import feedReducer, { fetchFeeds } from '../feedSlice';

// Мокаем API вызов
jest.mock('@api');

describe('fetchFeeds thunk', () => {
  it('должен отправить запрос и вернуть данные при выполнении', async () => {
    const fakeResponse = {
      orders: [{ id: 1, name: 'order1' }],
      total: 100,
      totalToday: 10
    };

    // Мокаем возвращаемое значение API
    (getFeedsApi as jest.Mock).mockResolvedValue(fakeResponse);

    const result = await fetchFeeds()(jest.fn(), () => {}, undefined);

    expect(result.payload).toEqual(fakeResponse);
    expect(getFeedsApi).toHaveBeenCalledTimes(1);
  });
});

describe('feedsSlice reducer', () => {
  const initialState = {
    feedOrders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  it('должен установить состояние загрузки при pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен обновить состояние при fulfilled', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: [{ id: 1, name: 'order1' }],
        total: 100,
        totalToday: 10
      }
    };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.feedOrders).toEqual([{ id: 1, name: 'order1' }]);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('должен установить ошибку при rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'API Error' }
    };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('API Error');
  });
});
