import { upload } from '@/services/api';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    *upload({ payload, callback }, { call, put }) {
      const response = yield call(upload, payload.data);
      if (callback && response) callback(response.data);
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },

  subscriptions: {
  },
};
