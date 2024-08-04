//User

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export type SigInDto = {
  email: string;
  password: string;
};

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface UserDatabaseFields {
  id: string;
  name: string;
  password: string;
  email: string;
  created_at: Date;
  update_at: Date;
}

export type SigInData = {
  email: string;
  password: string;
};
