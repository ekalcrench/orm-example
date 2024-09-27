import { UserModel } from '@/types';

export interface RegisterForm extends Omit<UserModel, 'id'> {
  confirmationPassword: string;
  isMoreThan17: boolean;
}
