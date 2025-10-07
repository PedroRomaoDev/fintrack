import queryString from "query-string";

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

  /**
   * Cria uma transação para o usuário autenticado
   * @param {*} input.from Data inicial (yyyy-mm-dd)
   * @param {*} input.to Data final (yyyy-mm-dd)
   * @returns {Object} Transações
   */
  getAll: async (input) => {
    const query = queryString.stringify({ from: input.from, to: input.to });
    const response = await protectedApi.get(`/transactions/me?${query}`);

    return response.data;
  },
};
