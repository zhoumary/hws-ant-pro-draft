import { isUrl, getRouteAuthority } from './utils';

describe('isUrl tests', (): void => {
  it('should return false for invalid and corner case inputs', (): void => {
    expect(isUrl([] as any)).toBeFalsy();
    expect(isUrl({} as any)).toBeFalsy();
    expect(isUrl(false as any)).toBeFalsy();
    expect(isUrl(true as any)).toBeFalsy();
    expect(isUrl(NaN as any)).toBeFalsy();
    expect(isUrl(null as any)).toBeFalsy();
    expect(isUrl(undefined as any)).toBeFalsy();
    expect(isUrl('')).toBeFalsy();
  });

  it('should return false for invalid URLs', (): void => {
    expect(isUrl('foo')).toBeFalsy();
    expect(isUrl('bar')).toBeFalsy();
    expect(isUrl('bar/test')).toBeFalsy();
    expect(isUrl('http:/example.com/')).toBeFalsy();
    expect(isUrl('ttp://example.com/')).toBeFalsy();
  });

  it('should return true for valid URLs', (): void => {
    expect(isUrl('http://example.com/')).toBeTruthy();
    expect(isUrl('https://example.com/')).toBeTruthy();
    expect(isUrl('http://example.com/test/123')).toBeTruthy();
    expect(isUrl('https://example.com/test/123')).toBeTruthy();
    expect(isUrl('http://example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('https://example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('http://www.example.com/')).toBeTruthy();
    expect(isUrl('https://www.example.com/')).toBeTruthy();
    expect(isUrl('http://www.example.com/test/123')).toBeTruthy();
    expect(isUrl('https://www.example.com/test/123')).toBeTruthy();
    expect(isUrl('http://www.example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('https://www.example.com/test/123?foo=bar')).toBeTruthy();
  });
});

describe('getRouteAuthority tests', () => {
  it('should return authority for each route', (): void => {
    const routes = [
      { path: '/user', name: 'user', authority: ['Player'], exact: true },
      { path: '/admin', name: 'admin', authority: ['Scotter'], exact: true },
    ];
    expect(getRouteAuthority('/user', routes)).toEqual(['Player']);
    expect(getRouteAuthority('/admin', routes)).toEqual(['Scotter']);
  });

  it('should return inherited authority for unconfigured route', (): void => {
    const routes = [
      { path: '/nested', authority: ['Scotter', 'Player'], exact: true },
      { path: '/nested/user', name: 'user', exact: true },
    ];
    expect(getRouteAuthority('/nested/user', routes)).toEqual(['Scotter', 'Player']);
  });

  it('should return authority for configured route', (): void => {
    const routes = [
      { path: '/nested', authority: ['Scotter', 'Player'], exact: true },
      { path: '/nested/user', name: 'user', authority: ['Player'], exact: true },
      { path: '/nested/admin', name: 'admin', authority: ['Scotter'], exact: true },
    ];
    expect(getRouteAuthority('/nested/user', routes)).toEqual(['Player']);
    expect(getRouteAuthority('/nested/admin', routes)).toEqual(['Scotter']);
  });

  it('should return authority for substring route', (): void => {
    const routes = [
      { path: '/nested', authority: ['Player', 'Players'], exact: true },
      { path: '/nested/users', name: 'users', authority: ['Players'], exact: true },
      { path: '/nested/user', name: 'user', authority: ['Player'], exact: true },
    ];
    expect(getRouteAuthority('/nested/user', routes)).toEqual(['Player']);
    expect(getRouteAuthority('/nested/users', routes)).toEqual(['Players']);
  });
});
