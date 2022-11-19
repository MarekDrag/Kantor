/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { clean } from 'knex-cleaner';
import knex from 'knex';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { defaultCreateUserDto } from '../src/modules/users/test/users.fixture';
import { LoginUserDto } from '../src/modules/users/dtos/login-user.dto';
import { CreateUserDto } from '../src/modules/users/dtos/create-user.dto';
import { user5 } from '../src/db/seeds/01_users';
import { UpdateUserDto } from '../src/modules/users/dtos/update-user.dto';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  const dbConnection = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DB_URL,
    },
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 15000);

  beforeEach(async () => {
    await clean(dbConnection as any, {
      ignoreTables: ['migrations', 'knex_migrations_lock'],
    });
    await dbConnection.seed.run({ directory: './src/db/seeds' });
  });

  afterAll(async () => {
    await app.close();
    await dbConnection.destroy();
  });

  let jwtToken: string;

  describe('JWT TOKEN', () => {
    it('should create jwt token', async () => {
      // arange
      const loginUserDto: LoginUserDto = {
        email: user5.email,
        password: 'pass',
      };
      // act
      const loginResult = await request(app.getHttpServer()).post('/users/login').send(loginUserDto);
      jwtToken = loginResult.body.accessToken;
      // assert
      expect(loginResult.status).toBe(HttpStatus.OK);
      expect(loginResult.body).toHaveProperty('accessToken');
    });
  });

  it('should exclude password from response and forbid to register user with already occupied credentials', async () => {
    const registerResult = await request(app.getHttpServer()).post('/users/register').send(defaultCreateUserDto);
    expect(registerResult.status).toBe(HttpStatus.CREATED);
    expect(registerResult.body).not.toHaveProperty('password');

    const alreadyExitingUserResult = await request(app.getHttpServer())
      .post('/users/register')
      .send(defaultCreateUserDto);
    expect(alreadyExitingUserResult.status).toBe(HttpStatus.CONFLICT);
  });

  it('should not validate register route body', async () => {
    //arrange
    const createUserDto: CreateUserDto = { ...defaultCreateUserDto, password: 'ab' };
    //act
    const registerResult = await request(app.getHttpServer()).post('/users/register').send(createUserDto);
    //assert
    expect(registerResult.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should register user, login user and send accessToken', async () => {
    const loginUserDto: LoginUserDto = { email: defaultCreateUserDto.email, password: defaultCreateUserDto.password };

    const registerResult = await request(app.getHttpServer()).post('/users/register').send(defaultCreateUserDto);
    expect(registerResult.status).toBe(HttpStatus.CREATED);

    const loginResult = await request(app.getHttpServer()).post('/users/login').send(loginUserDto);
    expect(loginResult.status).toBe(HttpStatus.OK);
    expect(loginResult.body).toHaveProperty('accessToken');
  });
  describe('Users CRUD', () => {
    it('should get all users', async () => {
      // arange
      // act
      const result = await request(app.getHttpServer()).get('/users').set('Authorization', `Bearer ${jwtToken}`);
      // assert
      expect(result.status).toBe(HttpStatus.OK);
      expect(result.body).toHaveLength(7);
    });
    it('should update user', async () => {
      // arange
      const updateUserDto: UpdateUserDto = {
        username: 'kamilnowak',
        firstName: 'kamil',
      };
      // act
      const result = await request(app.getHttpServer())
        .patch('/users')
        .send(updateUserDto)
        .set('Authorization', `Bearer ${jwtToken}`);
      // assert
      expect(result.status).toBe(HttpStatus.OK);
      expect(result.body).toHaveProperty('username', updateUserDto.username);
      expect(result.body).toHaveProperty('firstName', updateUserDto.firstName);
    });
    it('should delete soft user', async () => {
      // arange
      // act
      const result = await request(app.getHttpServer()).delete('/users').set('Authorization', `Bearer ${jwtToken}`);
      const resultError = await request(app.getHttpServer())
        .delete('/users')
        .set('Authorization', `Bearer ${jwtToken}`);
      // assert
      expect(result.status).toBe(HttpStatus.OK);
      expect(resultError.body).toHaveProperty('message', 'user not found');
    });
  });
});
