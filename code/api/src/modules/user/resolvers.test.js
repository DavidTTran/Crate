import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../setup/schema';

import { create } from './resolvers.js'
import models from '../../setup/models'

describe("user resolvers", () => {
  test("creating a user", async (done) => {
    const attributes = { name: "test", email: "test@example.com", password: "123456" };
    const { name, email } = await create(attributes);
    expect(attributes).toMatchObject({ name, email });
    done();
  });
});
