import { Effect, Reducer, history } from 'umi';
import {message, notification} from 'antd';

import { register } from '@/services/register';

export interface RegisterStateType {
  status?: number;
  code?: number;
  message?: string;
  userID?: number;
  userRoles?: string[];
}

export interface RegisterModelType {
  namespace: string;
  state: RegisterStateType;
  effects: {
    submit: Effect;
  };
  reducers: {
    registerHandle: Reducer<RegisterStateType>;
  };
}

const RegisterModel: RegisterModelType = {
  namespace: 'userAndregister',

  state: {
    status: undefined,
    userID: undefined,
    code: undefined,
    message: undefined
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(register, payload);
      if (response) {
        const currRoles = payload.roles;
        yield put({
          type: 'registerHandle',
          payload: response,
          roles: currRoles
        });

        const respData = response.data;

        if (respData.code === 0) {
          message.success('注册成功！');

          const account = response.data.data.email;
          history.push({
            pathname: '/user/register-result',
            state: {
              account
            },
          });
        } else {
          notification.error({
            message: `请求错误`,
            description: respData.msg,
          });
        }
      }
    },
  },

  reducers: {
    registerHandle(state, { payload, roles }) {

      const userData = payload.data;
      const userResponse = payload.response;
      if (!userData || !userResponse) {
        return {
          ...state
        };
      }

      const userid : number | undefined = userData.data.id;

      return {
        ...state,
        status: userResponse.status,
        code: userData.code,
        message: userData.msg,
        userID: userid,
        userRoles: roles
      };
    },
  },
};

export default RegisterModel;
