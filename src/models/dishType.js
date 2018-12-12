import { queryDishType, removeDishType, addDishType, updateDishType, queryAllDishType } from '@/services/dishType';

export default {
  namespace: 'dishType',

  state: {
    data: [],
    currentPage: 0,
    pageSize: 10,
    total: 0,
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryDishType, payload);
      yield put({
        type: 'save',
        payload: {
          ...payload,
          data: response.data.results,
          total: response.data.count,
        },
      });
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addDishType, payload);
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeDishType, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateDishType, payload);
      if (callback) callback();
    },
    *fetchAll({ payload }, { call, put }) {
      const response = yield call(queryAllDishType, payload);
      if (callback && response) callback(response.data.results);
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
