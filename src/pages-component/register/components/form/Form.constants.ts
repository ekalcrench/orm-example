import * as yup from "yup";

import {
  requiredBooleanSchema,
  requiredEmailSchema,
  requiredPasswordSchema,
  requiredStringSchema,
} from "@/utils";
import { RegisterForm } from "./Form.types";

export const registerDefaultValue: RegisterForm = {
  isMoreThan17: false,
  email: "",
  name: "",
  password: "",
};

export const registerSchema = yup
  .object()
  .shape<Partial<Record<keyof RegisterForm, yup.Schema>>>({
    isMoreThan17: requiredBooleanSchema(""),
    email: requiredEmailSchema("Email"),
    name: requiredStringSchema("Name"),
    password: requiredPasswordSchema("Password"),
  })
  .required() as yup.ObjectSchema<RegisterForm>;
