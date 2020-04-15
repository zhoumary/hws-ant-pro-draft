import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryCurrUser(userID: any) {
  const userKey = userID.userid;
  return request(`/api/v1/users/${  userKey}`, {
    method: 'GET',
    credentials: 'include'
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
