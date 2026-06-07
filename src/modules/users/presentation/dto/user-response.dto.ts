export type UserResponseDto = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  createdAt: Date;
};

export type AuthResponseDto = {
  success: boolean;
  data: {
    token: string;
    user: UserResponseDto;
  };
};

export type LoginResponseDto = {
  success: boolean;
  data: {
    token: string;
    user: UserResponseDto;
  };
};

export type RegisterResponseDto = {
  success: boolean;
  data: {
    user: UserResponseDto;
  };
};

export type ProfileResponseDto = {
  success: boolean;
  data: UserResponseDto;
};
