import { SessionModel, UserModel } from '@/types';
import { PrismaClient } from '@prisma/client';
import { getByEmail as getUserByEmail } from './User';

const prisma = new PrismaClient();

export const create = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user?.id) return null;

  const session = await prisma.session.create({ data: { userId: user.id } });

  return session;
};

export const getById = async (id: string) => {
  const session = await prisma.user.findFirst({ where: { id } });

  return session;
};

export const update = async (data: UserModel) => {
  const session = await prisma.user.update({ data, where: { id: data.id } });

  return session;
};
