'use strict';

const { authDb } = require('../src/auth/models');
const { server } = require('../src/server');
const supertest = require('supertest');

const request = supertest(server);

beforeAll(async () => {
  await authDb.sync();
});
afterAll(async () => {
  await authDb.drop();
});


let username = 'test-name';
let password = 'test';

describe('App integration tests', () => {
  test('should register a user', async () => {
    const response = await request.post('/signup').send({
      username: username,
      password: password,
      role: 'admin',
    });
    expect(response.status).toBe(201);
    expect(response.body.user.username).toEqual('test-name');
    expect(response.body.user.role).toEqual('admin');
    expect(response.body.user.token).toBeTruthy();
  });

  test('should singe in a user with basic auth credentials', async () => {
    const response = await request.post('/signin').auth(username, password);

    expect(response.status).toBe(200);
    expect(response.body.user.username).toEqual('test-name');
    expect(response.body.user.role).toEqual('admin');
    expect(response.body.user.token).toBeTruthy();
  });

  test('should create a todo, on POST to /todo', async () => {
    const response = await request.post('/todo').send({
      description: 'New todo',
      assignee: 'test name',
      difficulty: 3,
    });

    expect(response.status).toBe(201);
    expect(response.body.todo.description).toBe('New todo');
    expect(response.body.todo.assignee).toBe('test name');
    expect(response.body.todo.difficulty).toBe(3);
  });

  test('should read all todos, on GET to /todo', async () => {
    const response = await request.get('/todo').send({
      description: 'New todo',
      assignee: 'test name',
      difficulty: 3,
    });

    expect(response.status).toBe(200);
    expect(response.body.length).toBeTruthy();
    expect(response.body[0].description).toBe('New todo');
  });

  test('should update a todo on PATCH to /todo/:id', async () => {
    const response = await request.patch('/todo/1').send({
      assignee: 'new test name',
    });

    expect(response.status).toBe(200);
    expect(response.body[0].assignee).toBe('New test person');
  });

  test('should remove a todo on DELETE to /todo/:id', async () => {
    const response = await request.delete('/todo/1');

    expect(response.status).toBe(204);
    expect(response.body.id).toBe(1);
  });
});


