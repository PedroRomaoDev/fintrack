import { protectedApi } from "@/lib/axios";

export const TransactionService = {
  /**
   * Cria uma transação para o usuário autenticado
   * @param {*} input.name Nome da transação
   * @param {*} input.amount Valor da transação
   * @param {*} input.type Tipo da transação (EARNING/EXPENSE/INVESTMENT)
   * @param {*} input.date Data da transação (YYYY-MM-DD)
   * @returns {Object} Transação criada
   */
  create: async (input) => {
    const response = await protectedApi.post("/transactions/me", input);
    return response.data;
  },
};
