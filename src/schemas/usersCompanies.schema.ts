import { z } from "zod";

export const createUserCompanySchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  avatar: z.string().max(200).nullish(),
  site: z.string().max(50).nullable(),
  local: z.string(),
});

export const returnUserCompanySchema = createUserCompanySchema
  .extend({
    id: z.number(),
    deletedAt: z.date().or(z.string()).nullable(),
  })
  .omit({ password: true });
