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
    const response = await protectedApi.post("/transactions/me", {
      name: input.name,
      amount: input.amount,
      type: input.type,
      date: input.date,
    });
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
  /**
   * Cria uma transação para o usuário autenticado
   * @param {*} input Dados da transação
   * @param {*} input.id ID da transação
   * @param {*} input.name Nome da transação
   * @param {*} input.date Data da transação (YYYY-MM-DD)
   * @param {*} input.amount Valor da transação
   * @param {*} input.type Tipo da transação (EARNING/EXPENSE/INVESTMENT)
   * @param {*}
   * @returns {Object} Transações
   */
  update: async (input) => {
    const response = await protectedApi.patch(`/transactions/me/${input.id}`, {
      name: input.name,
      date: input.date,
      amount: input.amount,
      type: input.type,
    });

    return response.data;
  },
  /**
   * Deleta uma transação do usuário autenticado
   * @param {Object} input
   * @param {string} input.id - ID da transação a ser deletada.
   */
  delete: async (input) => {
    const response = await protectedApi.delete(`/transactions/me/${input.id}`);
    return response.data;
  },
};
