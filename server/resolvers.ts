const db = require('./model/db');

const resolvers = {
  Query: {
    async getUsers () {
      const users = await db.User.findAll();
      return users;
    }
  },
  Mutation: {
    async createUser () {
      return;
    }
  }
}

module.exports = resolvers;