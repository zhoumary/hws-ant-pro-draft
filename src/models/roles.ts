import { Effect, Reducer } from 'umi';

import { getRoles } from '@/services/roles';

export interface RoleType {
  status?: 'ok' | 'error';
  roles?: string[];
}

export interface RoleModelType {
  namespace: string;
  state: RoleType;
  effects: {
    getRoles: Effect;
  };
  reducers: {
    getRolesHandle: Reducer<RoleType>;
  };
}

const RoleModel: RoleModelType = {
  namespace: 'roles',

  state: {
    status: undefined,
  },

  effects: {
    *getRoles({ payload }, { call, put }) {
      const response = yield call(getRoles, payload);
      yield put({
        type: 'getRolesHandle',
        payload: response,
      });
    },
  },

  reducers: {
    getRolesHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};

export default RoleModel;
