import { protectedApi, publicApi } from "@/lib/axios";

//chamar a api e tratar o dado como ele precisa ser tratado
//tratamentos, conversões de dados, etc
export const UserService = {
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
