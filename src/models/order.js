import { queryOrder, removeOrder, addOrder, updateOrder, queryOrderById } from '@/services/order';

export default {
  namespace: 'order',

  state: {
    data: [],
    currentPage: 0,
    pageSize: 10,
    total: 0,
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryOrder, payload);
      if (response && response.data) {
        yield put({
          type: 'save',
          payload: {
            ...payload,
            data: response.data.results,
            total: response.data.count,
          },
        });
      }
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addOrder, payload);
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeOrder, payload);
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateOrder, payload);
      if (callback) callback();
    },
    *fetchById({ payload, callback }, { call, put }) {
      const response = yield call(queryOrderById, payload);
      if (callback && response) callback(response.data);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
