import { UserModel } from '@/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (data: Omit<UserModel, 'id'>) => {
  const user = await prisma.user.create({ data });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findFirst({ where: { id } });

  return user;
};

export const updateUser = async (data: UserModel) => {
  const user = await prisma.user.update({ data, where: { id: data.id } });

  return user;
};
