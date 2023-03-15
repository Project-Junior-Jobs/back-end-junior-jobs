import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { UserDev } from "../../entities/usersDev.entity";
import { AppError } from "../../errors";
import { ILogin } from "../../interfaces/login.interfaces";
import "dotenv/config";
import { UserCompany } from "../../entities/usersCompanies.entity";

export const createLoginService = async (loginData: ILogin): Promise<string> => {
  const userRepository: Repository<UserDev> = AppDataSource.getRepository(UserDev);
  const userCompanyRepository: Repository<UserCompany> = AppDataSource.getRepository(UserCompany);

  const user: UserDev | null = await userRepository.findOneBy({
    email: loginData.email,
  });

  const userCompany: UserCompany | null = await userCompanyRepository.findOneBy({
    email: loginData.email,
  });

  if (!userCompany && !user) {
    throw new AppError("Invalid credentials", 401);
  }

  if (user) {
    const validatedPassword = await compare(loginData.password, user.password);

    if (!validatedPassword) {
      throw new AppError("Invalid credentials", 401);
    }
    const token: string = jwt.sign({}, process.env.SECRET_KEY!, {
      expiresIn: "24h",
      subject: user.id.toString(),
    });
    return token;
  } else {
    const validatedPassword = await compare(loginData.password, userCompany!.password);

    if (!validatedPassword) {
      throw new AppError("Invalid credentials", 401);
    }
    const token: string = jwt.sign({}, process.env.SECRET_KEY!, {
      expiresIn: "24h",
      subject: userCompany!.id.toString(),
    });
    return token;
  }
};
