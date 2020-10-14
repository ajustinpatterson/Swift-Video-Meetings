import { db } from '../model/db';
import { UUIDResolver } from 'graphql-scalars';
import {
  MutationCreateUser,
  MutationDeleteUser,
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
      await user.destroy();
      return user;
    },
    async updateUser (_: any, { userDetails }: MutationUpdateUser, { db }: any) {
      if (!userDetails) throw new Error('Oops, no user details provided!');
      const updatedUserDetails = Object.assign(db, userDetails);
      const updatedUser = await db.User.update(updatedUserDetails, { where: {id: userDetails.id}, returning: true});
      if (!updatedUser) throw new Error ('User not updated');
      return updatedUser[1][0];
    }
  },
};

export { resolvers };