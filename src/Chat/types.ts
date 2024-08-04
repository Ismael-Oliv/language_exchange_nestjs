//message

export type SendMessageDto = {
  sender_id: string;
  receiver_id: string;
  message: string;
};

export type SendMessageData = {
  sender_id: string;
  receiver_id: string;
  message: string;
};

export interface MessageDatabaseFields {
  id?: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  created_at?: Date;
  update_at?: Date;
}

export interface UserDatabaseFields {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  created_at: Date;
  update_at: Date;
}
