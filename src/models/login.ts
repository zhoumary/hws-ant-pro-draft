import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';
import { Cookies } from 'react-cookie';

import { login, logout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

export interface StateType {
  status?: number;
  type?: string;
  currentAuthority?: string[];
  userID?: number;
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);

      if (!response) {
        return;
      }


      const loginCookies = new Cookies();
      let respStatus: number;
      if (response.response) {
        respStatus = response.response.status;
      } else {
        respStatus = response.status;
      }


      if (respStatus === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });

        // set logged_in cookie
        loginCookies.set('isLoggedIn', true, { path: "/", expires: new Date(Date.now()+1800000)});
        loginCookies.set('userID', response.data.id, { path: "/", expires: new Date(Date.now()+1800000)});

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');

      } else {
        // set logged_in cookie
        loginCookies.set('isLoggedIn', false);
        loginCookies.set('userID', "");
      }
    },

    *logout({ payload }, { call }) {
      const response = yield call(logout, payload);
      console.log(response);

      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        // set logged_in cookie
        const loginCookies = new Cookies();
        loginCookies.set('isLoggedIn', false);
        loginCookies.set('userID', "");

        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const userData = payload.data;
      const userResponse = payload.response;
      if (!userData || !userResponse) {
        return {
          ...state
        };
      }

      // by user role to ensure menus
      const authes:string[] = ["Scotter", "Player"];
      setAuthority(authes);

      return {
        ...state,
        status: userResponse.status,
        type: "account",
        userID: userData.id
      };
    },
  },
};

export default Model;
