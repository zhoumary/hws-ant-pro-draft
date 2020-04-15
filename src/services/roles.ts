import request from '@/utils/request';

export async function getRoles() {
  return request('/api/v1/roles', {
    method: 'GET'
  });
}
