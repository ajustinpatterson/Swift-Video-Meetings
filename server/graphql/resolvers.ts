import { db } from '../model/db';
import { UUIDResolver } from 'graphql-scalars';
import {
  MutationCreateUser,
  MutationDeleteUser,
  MutationUpdateStatus,
  MutationUpdateUser
} from './types';

const resolvers = {

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
        bio: userDetails.bio,
        avatar: userDetails.avatar,
        status: userDetails.status
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
      console.log('HERE', ctx)
      console.log('HEYYYY', ctx.user)
      const updatedUserDetails = Object.assign(ctx, userDetails);
      const updatedUser = await db.User.update
    }
  },

};

export { resolvers };