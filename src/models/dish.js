import { queryDish, removeDish, addDish, updateDish } from '@/services/dish';

export default {
  namespace: 'dish',

  state: {
    data: [],
    currentPage: 0,
    pageSize: 0,
    total: 0,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDish, payload);
      yield put({
        type: 'save',
        payload: {
          ...payload,
          ...response,
        },
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addDish, payload);
      debugger
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeDish, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateDish, payload);
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
