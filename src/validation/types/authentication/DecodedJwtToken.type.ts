import { User } from "../../../models/User.model";

export const userPropertiesToOmitInTokens = [
  "passwordHash",
  "refreshToken",
  "salt",
] as const;

type DecodedJwtToken = Omit<
  User,
  (typeof userPropertiesToOmitInTokens)[number]
>;

export default DecodedJwtToken;
