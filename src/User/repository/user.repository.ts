import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { UserDatabaseFields, CreateUserData } from '../types';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('IOPostgres') private readonly postgresClient: PoolClient,
  ) {}

  private returnStatement(arr: Array<any>): any | undefined {
    return arr.length > 0 ? arr : undefined;
  }

  public async create(data: CreateUserData): Promise<void> {
    await this.postgresClient.query(
      'INSERT INTO users (name, email, password) VALUES($1, $2, $3)',
      [data.name, data.email, data.password],
    );

    return;
  }

  public async findByEmail(
    email: string,
  ): Promise<UserDatabaseFields | undefined> {
    const user = await this.postgresClient.query(
      'SELECT * FROM users WHERE email= $1',
      [email],
    );

    const statement = this.returnStatement(user.rows);
    return statement && statement[0];
  }

  public async findById(id: string): Promise<UserDatabaseFields | undefined> {
    const user = await this.postgresClient.query(
      'SELECT * FROM users WHERE id= $1',
      [id],
    );

    const statement = this.returnStatement(user.rows);
    return statement && statement[0];
  }

  public async findByIds(
    listIds: Array<{ id: string }>,
  ): Promise<UserDatabaseFields | undefined> {
    const user = await this.postgresClient.query(
      'SELECT * FROM users WHERE id= ANY($1)',
      [listIds],
    );

    const statement = this.returnStatement(user.rows);
    return statement;
  }

  public async find(): Promise<Array<UserDatabaseFields> | undefined> {
    const user = await this.postgresClient.query('SELECT * FROM users');

    return this.returnStatement(user.rows);
  }
}
