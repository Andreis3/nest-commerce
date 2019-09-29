import 'dotenv/config';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import * as mongoose from 'mongoose';

import { RegisterDTO, LoginDTO } from '../src/auth/auth.dto';
import { app } from './constants';



beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  });
  await mongoose.connection.db.dropDatabase();
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('AUTH', () => {
  const user: RegisterDTO | LoginDTO = {
    username: 'username',
    password: 'password',
  };

  const sellerRegister: RegisterDTO = {
    username: 'seller',
    password: 'password',
    seller: true
  };

  const sellerLogin: LoginDTO = {
    username: 'seller',
    password: 'password',
  };

  let userToken: string;
  let sellerToken: string;

  it('should register user', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        userToken=body.token;
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
        expect(body.user.seller).toBeFalsy();

      })
      .expect(HttpStatus.CREATED);
  });

  it('should register seller', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(sellerRegister)
      .expect(({ body }) => {
        sellerToken=body.token;
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('seller');
        expect(body.user.password).toBeUndefined();
        expect(body.user.seller).toBeTruthy();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should reject duplicate registration', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.message).toEqual('User already exists');
        expect(body.code).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
      })
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);
  })

  it('should login', () => {
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });
});
