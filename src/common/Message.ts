import { User } from './User';

export class Message {
  constructor(id: number, author: User, text: string) {
    this.id = id;
    this.author = author;
    this.text = text;
  }
  id: number;
  author?: User;
  text: string = '';
}
