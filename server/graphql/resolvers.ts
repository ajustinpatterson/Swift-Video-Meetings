const db = require('../model/db');

const resolvers = {
  Query: {
    async getUsers () {
      const users = await db.User.findAll();
      return users;
    }
  },
  Mutation: {
    async createUser (_: any, { input }: any) {
      const newUser = await db.User.create({
        id: input.id,
        name: input.name,
        email: input.name
      })
      return newUser;
    },
    async updateUser (_: any, { id }: any) {

    },
    async deleteUser (_: any, { id }: any) {

    }
  }
}

module.exports = resolvers;