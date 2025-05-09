import prismaClient  from "../config/db/db";

export const save = async (username, passwordHash, refreshToken = null) => {
  const user = await prismaClient.user.create({
    data: {
      username,
      passwordHash,
      refreshToken
    }
  });
  return user;
};

export const findByUsername = async (username) => {
  return await prismaClient.user.findUnique({
    where: {
      username
    }
  });
}

export const addRefreshToken = async (id, token) => {
  return await prismaClient.user.update({
    where: { id },
    data: {
      refreshToken: token
    }
  });
}