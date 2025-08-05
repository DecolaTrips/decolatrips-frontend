export interface User {
  email: string;
  password: string;
}

export interface RegisterUser extends User {
  username: string;
  cpf: string;
  confirmPassword: string;
}