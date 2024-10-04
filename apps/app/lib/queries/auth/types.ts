export type AuthResponse = {
  type: string;
  name: string | null;
  token: string;
  abilities: string[];
  lastUsedAt: string | null;
  expiresAt: string;
};

export type LoginRequest = {
    email: string;
    password: string;
  };
  
  export type RegisterRequest = {
    email: string;
    password: string;
    passwordConfirmation: string;
  };