// Models
import UserModel from "../models/User.model";

// Utils
import logger from "../utils/logger.util";

const getUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({
    email,
  });

  logger.info(user?.password);

  return user;
};

export default {
  getUserByEmail,
};
