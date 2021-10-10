export interface LoginForm {
  login: string;
  password: string;
}

export interface User {
  login: string;
}

export interface Message {
  author?: User;
  text: string;
}
