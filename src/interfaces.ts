export interface LoginForm {
  login: string;
  password: string;
}

export interface User {
  login: string;
}

export interface Message {
  id: number;
  authorId: number;
  author: User;
  text: string;
}

export interface Auth {
  username: string;
  password: string;
}
