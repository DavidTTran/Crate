import request from 'supertest';
import express from 'express';
import bcrypt from 'bcrypt'
import graphqlHTTP from 'express-graphql';

import schema from '../../setup/schema';
import models from '../../setup/models'
import db from '../../setup/database';
import { create } from './resolvers.js';

describe("user queries", () => {
  let server = express();
  var admin;
  var user;

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

  it("returns all users", async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ users { name email } }' })
      .expect(200)

    expect(response.body.data.users.length).toEqual(2)
  })

  it("returns a single user", async () => {
    const response = await request(server)
      .get('/')
      .send({ query: `{ user(id: ${ user.id }) { id name email } }` })
      .expect(200)

    expect(response.body.data.user.name).toEqual("The User")
  })

  it("authenticates a user given password and email", async () => {
    const response = await request(server)
      .get('/')
      .send({ query: `{ userLogin(email: "admin@crate.com", password: "123456") {
        user { id name } token } }`})
      .expect(200)
    expect(response.body.data.userLogin.user.name).toEqual("The Admin")
    expect(response.body.data.userLogin.user.id).toEqual(admin.id)
    expect(response.body.data.token).toBeTruthy
  })
})
