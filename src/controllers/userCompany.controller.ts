import { Request, Response } from "express";
import { createUserCompanyService } from "../services/users/companies/createUserCompany.service";

export const createUserCompanyController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData = req.body;

  const newUser = await createUserCompanyService(userData);

  return res.status(201).json(newUser);
};
