import { queryDish, removeDish, addDish, updateDish, queryDishById } from '@/services/dish';

export default {
  namespace: 'dish',

  state: {
    data: [],
    currentPage: 0,
    pageSize: 10,
    total: 0,
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryDish, payload);
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
      const response = yield call(addDish, payload);
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeDish, payload);
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateDish, payload);
      if (callback) callback();
    },
    *fetchById({ payload, callback }, { call, put }) {
      const response = yield call(queryDishById, payload);
      if (callback && response) callback(response.data[0]);
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
