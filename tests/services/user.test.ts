// Services
import userServices from "../../src/services/user.services";

// Models
import UserModel, { User } from "../../src/models/User.model";

jest.mock("../../src/models/User.model");

test("getUserByEmail returns a user", async () => {
  const user: User = {
    email: "email@me.com",
    password: "password",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: new Date(),
  };
  (UserModel.findOne as jest.Mock).mockResolvedValue(user);

  const returnedUser = await userServices.getUserByEmail("email@me.com");
  expect(returnedUser).toEqual(user);
});
