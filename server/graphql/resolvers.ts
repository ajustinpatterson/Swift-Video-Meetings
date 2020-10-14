import { db } from '../model/db';
import { EmailAddressResolver, UUIDResolver } from 'graphql-scalars';
import {
  MutationUpdateEmail,
  MutationCreateUser,
  MutationDeleteUser,
  MutationUpdateUser
} from './types';

const resolvers = {

  EmailAddress: EmailAddressResolver,
  UUID: UUIDResolver,

  Query: {
    async getUsers () {
      const users = await db.User.findAll();
      return users;
    }
  },
  Mutation: {
    async createUser (_: any, { userDetails }: MutationCreateUser) {
      const newUser = await db.User.create({
        name: userDetails.name,
        email: userDetails.email,
        bio: userDetails.bio,
        avatar: userDetails.avatar
      })
      return newUser;
    },
    async deleteUser (_: any, { id }: MutationDeleteUser) {
      const user = await db.User.findOne({ where: { id } });
      if (user) {
        await user.destroy();
        return {
          success: true,
          message: 'User successfully deleted'
        }
      }
    },
    async updateEmail (_: any, { id, email }: MutationUpdateEmail) {
      const user = await db.User.update({ email }, {where: { id: id }} )
      if (user) {
        return {
          success: true,
          message: 'Email successfully updated'
        }
      }
    },
    async updateUser (_: any, { userDetails }: MutationUpdateUser, ctx: any) {
      console.log('HEREEEE', ctx)
      // const updatedUser = Object.assign(ctx.user, userDetails)
    }
  },

};

export { resolvers };