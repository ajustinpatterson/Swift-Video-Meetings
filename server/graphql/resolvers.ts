const db = require('../model/db');

const resolvers = {
  Query: {
    async getUsers () {
      const users = await db.User.findAll();
      return users;
    }
  },
  Mutation: {
    // async createUser (_, {id: any}, ctx: any) {
      // const user = ctx.request.body;
      // const newUser = await db.User.create({
      //   name: user.name,
      //   email: user.email,
      //   bio: user.bio,
      //   avatar: user.avatar
      // });
      // return newUser;
    // }
  }
}

module.exports = resolvers;