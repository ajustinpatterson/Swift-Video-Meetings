import { db } from '../model/db';
import { UUIDResolver, EmailAddressResolver } from 'graphql-scalars';
import {
  MutationCreateUser,
  MutationDeleteUser,
  MutationUpdateUser
} from './types';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const resolvers = {

  UUID: UUIDResolver,
  EmailAddress: EmailAddressResolver,

  Query: {
    async getUsers () {
      const users = await db.User.findAll();
      return users;
    }
  },
  Mutation: {
    async createUser (_: any, { userDetails }: MutationCreateUser) {
      const user = await db.User.findOne({ where: {email: userDetails.email} });
      if (user) throw new Error ('email already exists'); //if no user, create one
      const newUser = await db.User.create({
        email: userDetails.email,
        familyName: userDetails.familyName,
        givenName: userDetails.givenName,
        googleId: userDetails.googleId,
        imageUrl: userDetails.imageUrl,
        name: userDetails.name!
      })
      return newUser;
      //if user exists, return user
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