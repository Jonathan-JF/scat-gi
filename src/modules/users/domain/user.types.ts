export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'CITIZEN' | 'OPERATOR' | 'ADMIN';
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'CITIZEN' | 'OPERATOR';
};

export type LoginInput = {
  email: string;
  password: string;
};

export type JwtPayload = {
  userId: string;
  email: string;
  role: string;
};
