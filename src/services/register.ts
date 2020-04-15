import request from '@/utils/request';
import { UserRegisterParams } from '@/pages/user/register/index';

export async function fakeRegister(params: UserRegisterParams) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function register(params: any) {
  return request('/api/v1/users/register', {
    method: 'POST',
    data: params,
    getResponse: true
  });
}
