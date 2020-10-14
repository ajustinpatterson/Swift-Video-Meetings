export interface MutationUpdateEmail {
  id?: string
  email?: string
};

export interface CreateUserInput {
  id: string
  email: string
  name: string
  bio: string
  avatar: string
};

export interface UpdateUserInput {
  id: string
  email: string
  name: string
  bio: string
  avatar: string
};

export interface MutationCreateUser {
  userDetails: CreateUserInput
}

export interface MutationDeleteUser {
  id: string
}

export interface MutationUpdateUser {
  userDetails: UpdateUserInput
}