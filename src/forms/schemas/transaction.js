import z from "zod";

export const createTransactionFormSchema = z.object({
  name: z.string().trim().min(1, { message: "O título é obrigatório." }),
  amount: z.number({ message: "O valor é obrigatório." }),
  date: z.date({ message: "A data é obrigatória." }),
  type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"], {
    message: "O tipo é obrigatório.",
  }),
});

export const editTransactionFormSchema = createTransactionFormSchema.extend({
  id: z.uuid(),
});
