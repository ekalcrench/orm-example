"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

import { sessionOptions } from "./config/Session";
import { Auth } from "./types";

export const getSession = async () => {
  const session = await getIronSession<Auth>(cookies(), sessionOptions);

  return JSON.parse(JSON.stringify(session));
};

export const login = async (value: Auth) => {
  const session = await getIronSession<Auth>(cookies(), sessionOptions);

  session.email = value.email;
  session.sessionId = value.sessionId;

  await session.save();
};

export const logout = async () => {
  const session = await getIronSession<Auth>(cookies(), sessionOptions);

  session.destroy();
};
