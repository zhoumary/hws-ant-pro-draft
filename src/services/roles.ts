import request from 'umi-request';

export async function getRoles() {
  return request('/api/roles', {
    method: 'GET'
  });
}
