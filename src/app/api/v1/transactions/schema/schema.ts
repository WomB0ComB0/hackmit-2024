import { z } from 'zod';

export const schema = z.object({
  amount: z.number().positive(),
  productCategory: z.string().min(1),
  customerLocation: z.string().min(1),
  accountAgeDays: z.number().int().nonnegative(),
  transactionDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export type Schema = z.infer<typeof schema>;