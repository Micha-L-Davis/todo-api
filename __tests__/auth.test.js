'use strict';

const bearerMiddleware = require('../src/auth/middleware/bearer.js');
const aclMiddleware = require('../src/auth/middleware/acl');

describe('Auth Middleware tests', () => {

  test('Bearer middleware authenticates token on request', () => {
    let req = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ',
    };
    let res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
    };
    let next = jest.fn();

    bearerMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Access control should allow requests to go through with a valid token', () => {
    let req = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ',
    };
    let res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
    };
    let next = jest.fn();
    aclMiddleware('create')(req, res, next);
    expect(next).toHaveBeenCalled();
  });

});


