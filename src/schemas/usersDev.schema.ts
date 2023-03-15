import { z } from "zod";

export const createUserDevSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  avatar: z.string().max(200).nullable(),
});

export const returnUserSchema = createUserDevSchema
  .extend({
    id: z.number(),
    deletedAt: z.date().or(z.string()).nullable(),
  })
  .omit({ password: true });
