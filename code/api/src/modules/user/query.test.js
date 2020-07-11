import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../setup/schema';

describe("user queries", () => {
  let server;

  beforeAll(() => {
    server = express();
    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    );
  });

  it("returns all users", async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ users { name email } }' })
      .expect(200)

    console.log(response.body.data)
    expect(response.body.data.users.length).toEqual(3)
  })

  it("returns a single user", async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ user(id: 1) { id name email } }' })
      .expect(200)

    console.log(response.body.data)
    expect(response.body.data.user.name).toEqual("The Admin")
  })

  it("authenticates a user given password and email", async () => {
    const response = await request(server)
      .get('/')
      .send({ query: `{ userLogin(email: "admin@crate.com", password: "123456") {
        user { id name } token } }`})
      .expect(200)
    expect(response.body.data.userLogin.user.name).toEqual("The Admin")
    expect(response.body.data.userLogin.user.id).toEqual(1)
    expect(response.body.data.token).toBeTruthy
  })
})