import request from 'supertest';
import express from 'express';
import bcrypt from 'bcrypt'
import graphqlHTTP from 'express-graphql';

import schema from '../../setup/schema';
import models from '../../setup/models'
import db from '../../setup/database';
import { create } from './resolvers.js';

describe("user mutators", () => {
  let server = express();
  var admin;
  var user

  beforeAll(async () => {
    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    )

    const user1 = {
      name: 'The Admin',
      email: 'admin@crate.com',
      password: bcrypt.hashSync('123456', 10),
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const user2 = {
      name: 'The User',
      email: 'user@crate.com',
      password: bcrypt.hashSync('123456', 10),
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await models.User.destroy( { where: {} })
    admin = await models.User.create(user1);
    user = await models.User.create(user2);
  });

  it("it creates a user", async () => {
    const response = await request(server)
      .post('/')
      .send({ query: 'mutation{ userSignup(name: "test", email: "test@example.com", password: "123") { id name email } }' })
      .expect(200);

    const newUserId = response.body.data.userSignup.id
    let newUser = await models.User.findOne({ where: { id: newUserId } });

    expect(response.body.data.userSignup.name).toEqual("test")
    expect(newUser).toBeTruthy
  })

  it("can't create a user with an existing email", async () => {
    const response = await request(server)
      .post('/')
      .send({ query: 'mutation{ userSignup(name: "test", email: "admin@crate.com", password: "123") { id } }' })

    expect(response.body.errors[0].message).toEqual("The email admin@crate.com is already registered. Please try to login.")
  })

  it("can delete a user", async () => {
    const response = await request(server)
      .post('/')
      .send({ query: `mutation{ userRemove(id: ${ user.id }) { id } }` })

    expect(response.body.data.userRemove.id).toBe(null)
    let checkUser = await models.User.findOne({ where: { id: user.id } })
    expect(checkUser).toBe(null)
  })
});
