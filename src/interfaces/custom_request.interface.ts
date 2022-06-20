import { Request } from 'express';
import { UserEntity } from '../entities';

export interface CustomRequest extends Request {
  loggedUser?: UserEntity
}
