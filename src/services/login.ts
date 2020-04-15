import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function login(params: any) {
  return request('/login', {
    method: 'POST',
    data: params,
    // headers: {
    //   "content-type": "multipart/form-data"
    // },
    getResponse: true
  });
}

export async function logout(params: any) {
  return request('/logout', {
    method: 'POST',
    data: params,
    // headers: {
    //   "content-type": "multipart/form-data"
    // },
    getResponse: true
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
