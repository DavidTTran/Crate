import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../setup/schema';
import models from '../../setup/models'

describe("user mutators", () => {
  let server = express();

  beforeAll(async () => {
    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    );
  });

  it("it creates a user", async () => {
    const response = await request(server)
      .post('/')
      .send({ query: 'mutation{ userSignup(name: "test", email: "test10@example.com", password: "123") { id name email } }' })
      .expect(200);

    expect(response.body.data.userSignup.name).toEqual("test")
    let new_user = await models.User.findOne({ where: { id: new_user_id } });
    expect(new_user).toBeTruthy
  })

  it("can delete remove a user", async () => {
    const response = await request(server)
      .post('/')
      .send({ query: `mutation{ userRemove(id: ${new_user_id}) }` })

    let user = await models.User.findOne({ where: { id: new_user_id } });
    expect(user).toBe(null)
  });
});
