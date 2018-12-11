import { queryDishType, removeDishType, addDishType, updateDishType } from '@/services/dishType';

export default {
  namespace: 'dishType',

  state: {
    data: [],
    currentPage: 0,
    pageSize: 0,
    total: 0,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDishType, payload);
      yield put({
        type: 'save',
        payload: {
          ...payload,
          ...response,
        },
      });
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
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
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
