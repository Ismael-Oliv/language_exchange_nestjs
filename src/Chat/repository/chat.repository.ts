import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { Message } from '../model/message.model';
import { MessageDatabaseFields } from '../types';

@Injectable()
export class ChatRepository {
  constructor(
    @Inject('IOPostgres') private readonly postgresClient: PoolClient,
  ) {}

  private returnStatement(arr: Array<any>): any | undefined {
    return arr.length > 0 ? arr : undefined;
  }

  async create(data: MessageDatabaseFields) {
    const message = new Message(data);
    return message;
  }

  async save(data: MessageDatabaseFields) {
    await this.postgresClient.query(
      'INSERT INTO messages (id, sender_id, receiver_id, message, created_at, updated_at) VALUES($1,$2,$3,$4,$5,$6)',
      [
        data.id,
        data.sender_id,
        data.receiver_id,
        data.message,
        data.created_at,
        data.update_at,
      ],
    );
  }

  async ListMessageFromChat(sender_id: string, receiver_id: string) {
    const result = await this.postgresClient.query(
      'SELECT * FROM messages WHERE sender_id= $1 AND receiver_id=$2 OR sender_id= $2 AND receiver_id=$1',
      [sender_id, receiver_id],
    );

    return result.rows;
  }

  async ListAppointment() {
    const result = await this.postgresClient.query('SELECT * FROM appointment');

    return result.rows;
  }
}
