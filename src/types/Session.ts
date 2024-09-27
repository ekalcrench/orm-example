import { UserModel } from './User';

export interface SessionModel {
  id: string;
  user: UserModel;
}
