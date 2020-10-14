export interface CreateUserInput {
  id: string
  email: string
  name: string
  bio: string
  avatar: string
  status: string
};

export interface UpdateUserInput {
  id: string
  email?: string
  name?: string
  bio?: string
  avatar?: string
  status?: string
};

export interface MutationCreateUser {
  userDetails: CreateUserInput
}

export interface MutationDeleteUser {
  id: string
}

export interface MutationUpdateStatus {
  id: string
  status: string
}

export interface MutationUpdateUser {
  userDetails: UpdateUserInput
}