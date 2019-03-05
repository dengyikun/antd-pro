import { queryCode } from '@/services/code';

export default {
  namespace: 'code',

  state: {
  },

  effects: {
    *getCode({ payload, callback }, { call, put }) {
      const response = yield call(queryCode, payload);
      if (callback) callback(response);
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
