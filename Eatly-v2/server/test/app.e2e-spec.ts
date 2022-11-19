/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { clean } from 'knex-cleaner';
import knex from 'knex';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
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
  });

  beforeEach(async () => {
    await clean(dbConnection as any, {
      ignoreTables: ['migrations', 'knex_migrations_lock'],
    });
  });

  afterAll(async () => {
    await app.close();
    await dbConnection.destroy();
  });

  it('should get root url', async () => {
    // arrange

    // act
    const result = await request(app.getHttpServer()).get('/');

    // assert
    expect(result.body).toEqual({});
    expect(result.status).toBe(200);
  });
});
