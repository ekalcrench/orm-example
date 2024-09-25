import { UserModel } from "@/types";

export interface RegisterForm extends Omit<UserModel, "id"> {
  isMoreThan17: boolean;
}
