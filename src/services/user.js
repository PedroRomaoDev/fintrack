import { protectedApi, publicApi } from "@/lib/axios";

//chamar a api e tratar o dado como ele precisa ser tratado
//tratamentos, conversões de dados, etc
export const UserService = {
  /**
   * Cria um novo usuário
   * @param {Object} input
   * @param {string} input.firstName
   * @param {string} input.lastName
   * @param {string} input.email
   * @param {string} input.password
   * @returns  {Object} Usuário criado
   * @returns {string} return.tokens Tokens de autenticação
   */
  signup: async (input) => {
    const response = await publicApi.post("/users", {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    });
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    };
  },

  /**
   * Login de um usuário
   * @param {Object} input
   * @param {string} input.email
   * @param {string} input.password
   * @returns  {Object} Usuário autenticado
   * @returns {string} return.tokens Tokens de autenticação
   */
  login: async (input) => {
    const response = await publicApi.post("/users/login", {
      email: input.email,
      password: input.password,
    });
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    };
  },

  /**
   * Retorna o usuário autenticado
   * @returns  {Object} Usuário autenticado
   */
  me: async () => {
    const response = await protectedApi.get("/users/me");
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
    };
  },
};
