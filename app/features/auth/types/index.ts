export type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "moderator";
  createdAt: string;
  updatedAt: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpData = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};
