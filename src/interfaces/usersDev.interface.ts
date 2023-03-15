import { z } from "zod";
import { createUserDevSchema, returnUserSchema } from "../schemas/usersDev.schema";

export type IUser = z.infer<typeof createUserDevSchema>;
export type IUserReturn = z.infer<typeof returnUserSchema>;
