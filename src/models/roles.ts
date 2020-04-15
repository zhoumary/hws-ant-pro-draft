import { Effect, Reducer } from 'umi';

import { getRoles } from '@/services/roles';

export interface CurrentRole {
  id?: number;
  description?: string;
}

export interface RoleType {
  status?: number;
  roles?: Array<CurrentRole>;
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
    *getRoles(_, { call, put }) {
      const response = yield call(getRoles);
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
        roles: payload.data  || []
      };
    },
  },
};

export default RoleModel;
