import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_PUBLIC_SECRET_KEY ?? "",
  cookieName: "orm-example-session",
};
