import { db } from '../model/db';
import {UserAttributes} from '../model/user';
import { EmailAddressResolver, UUIDResolver } from 'graphql-scalars';
import {MutationUpdateName} from './types';

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
      if (newUser) {
        return {
          success: true,
          message: 'User successfully created'
        }
      }
      return newUser;
    },
    // async deleteUser (_: any, { id }: any) {
    //   const user = await db.User.findOne({ id });
    //   const deletedUser = await user.destroy();
    //   if (deletedUser) {
    //     return {
    //       success: true,
    //       message: 'User successfully deleted'
    //     }
    //   }
    // },
    async updateName (_: any, { id, email }: MutationUpdateName) {
      //arguments passed from client
      const user = await db.User.update({ email }, {where: { id: id }} )
      if (user) {
        return {
          success: true,
          message: 'Name successfully updated'
        }
      }
    }
  }
}

export { resolvers };