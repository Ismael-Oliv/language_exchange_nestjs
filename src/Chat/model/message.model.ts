import { v4 as uuid } from 'uuid';

type messageProps = {
  sender_id: string;
  receiver_id: string;
  message: string;
};

export class Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  created_at: Date;
  update_at: Date;

  constructor({ sender_id, receiver_id, message }: messageProps) {
    this.id = uuid();
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.message = message;
    this.created_at = new Date();
    this.update_at = new Date();
  }
}
