import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors";
import { Repository } from "typeorm";
import { UserDev } from "../entities";
import { AppDataSource } from "../data-source";

export const ensureUserDevIdExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<UserDev> = AppDataSource.getRepository(UserDev);
  const id: number = Number(req.params.id);

  const findUser: UserDev | null = await userRepository.findOneBy({ id: id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  return next();
};
