import { hashSync } from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { UserDev } from "../../entities/usersDev.entity";
import { AppError } from "../../errors";
import { IUser, IUserReturn } from "../../interfaces/usersDev.interface";
import { createUserDevSchema, returnUserSchema } from "../../schemas/usersDev.schema";

export const createUserDevService = async (userData: IUser): Promise<IUserReturn> => {
  const userRepository: Repository<UserDev> = AppDataSource.getRepository(UserDev);
  const validatedUserSchema = createUserDevSchema.parse(userData);

  validatedUserSchema.password = hashSync(validatedUserSchema.password, 10);
  userData = validatedUserSchema;

  const emailDevExist: UserDev | null = await userRepository.findOneBy({
    email: userData.email,
  });

  if (emailDevExist) {
    throw new AppError("Email already exists", 409);
  }
  const user: UserDev = userRepository.create(userData);

  await userRepository.save(user);

  const newUser = returnUserSchema.parse(user);

  return newUser;
};
