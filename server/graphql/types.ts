export interface CreateUserInput {
  _id?: string
  email: string
  familyName: string
  givenName: string
  googleId: string
  imageUrl: string
  name: string
};

export interface UpdateUserInput {
  _id: string
  email?: string
  familyName?: string
  givenName?: string
  googleId?: string
  imageUrl?: string
  name?: string
  bio?: string
  avatar?: string
  status?: string
};

export interface MutationCreateUser {
  userDetails: CreateUserInput
}

export interface MutationDeleteUser {
  _id: string
}

export interface MutationUpdateUser {
  userDetails: UpdateUserInput
}