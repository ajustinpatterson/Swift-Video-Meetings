import { db } from '../model/db';
import { EmailAddressResolver, UUIDResolver } from 'graphql-scalars';
import {
  MutationCreateUser,
  MutationDeleteUser,
  MutationUpdateStatus,
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
      const deletedUser = await user.destroy();
      return deletedUser;
    },
    async updateStatus (_: any, { id, status }: MutationUpdateStatus) {
      const user = await db.User.update({ status }, {where: { id }} );
      return user;
    },
    async updateUser (_: any, { userDetails }: MutationUpdateUser, ctx: any) {

    }
  },

};

export { resolvers };