import { hashSync } from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { UserCompany } from "../../../entities";
import { AppError } from "../../../errors";
import { IUser, IUserReturn } from "../../../interfaces/usersDev.interface";
import {
  createUserCompanySchema,
  returnUserCompanySchema,
} from "../../../schemas/usersCompanies.schema";

export const createUserCompanyService = async (userData: IUser): Promise<IUserReturn> => {
  const userRepository: Repository<UserCompany> = AppDataSource.getRepository(UserCompany);
  const validatedUserSchema = createUserCompanySchema.parse(userData);

  validatedUserSchema.password = hashSync(validatedUserSchema.password, 10);
  userData = validatedUserSchema;

  const emailCompanyExist: UserCompany | null = await userRepository.findOneBy({
    email: userData.email,
  });

  if (emailCompanyExist) {
    throw new AppError("Email already exists", 409);
  }
  const user: UserCompany = userRepository.create(userData);

  await userRepository.save(user);

  const newUser = returnUserCompanySchema.parse(user);

  return newUser;
};
