// Models
import UserModel, { User } from "../models/User.model";

const getUserByEmail = async (email: string) => {
  const user = (await UserModel.findOne({
    email,
  })) as User;

  return user;
};

export default {
  getUserByEmail,
};
