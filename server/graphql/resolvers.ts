import { db } from '../model/db';
import { EmailAddressResolver, UUIDResolver } from 'graphql-scalars';
import { MutationUpdateEmail, MutationCreateUser } from './types';

const resolvers = {
  Query: {
    async getUsers () {
      const users = await db.User.findAll();
      return users;
    }
  },
  Mutation: {
    async createUser (_: any, { userDetails }: MutationCreateUser) {
      const newUser = await db.User.create({
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.name
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
    async updateEmail (_: any, { id, email }: MutationUpdateEmail) {
      const user = await db.User.update({ email }, {where: { id: id }} )
      if (user) {
        return {
          success: true,
          message: 'Email successfully updated'
        }
      }
    }
  }
}

export { resolvers };