import { createUserDevService } from "../services/users/dev/createUserDev.service";
import { Request, Response } from "express";

export const createUserDevController = async (req: Request, res: Response): Promise<Response> => {
  const userData = req.body;

  const newUser = await createUserDevService(userData);

  return res.status(201).json(newUser);
};
