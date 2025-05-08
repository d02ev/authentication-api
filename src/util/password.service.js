import bcrypt from "bcrypt";

export const generatePasswordHash = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
}

export const comparePassword = async (plainPassword, passwordHash) => {
  return await bcrypt.compare(plainPassword, passwordHash);
}
