import bcrypt from "bcrypt";

export const createBcrypt = async (data: string, salt: number = 10) => {
  return await bcrypt.hash(data, salt);
};

export const compareBcrypt = async (data: string, encriptedData: string) => {
  return await bcrypt.compare(data, encriptedData);
};
