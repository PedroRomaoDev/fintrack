import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";

const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: "O e-mail é inválido.",
    })
    .trim()
    .min(1, {
      message: "O e-mail é obrigatório.",
    }),
  password: z.string().trim().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres.",
  }),
});

const LoginPage = () => {
  const [user, setUser] = useState(null);

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (variables) => {
      const response = await api.post("/users/login", {
        email: variables.email,
        password: variables.password,
      });
      return response.data;
    },
  });
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (!accessToken && !refreshToken) return;

        const response = await api.get("users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        console.error(error);
      }
    };
    init();
  }, []);
  const handleSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        const accessToken = loggedUser.tokens.accessToken;
        const refreshToken = loggedUser.tokens.refreshToken;
        setUser(loggedUser);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        toast.success("Login realizado com sucesso!");
      },
      onError: (error) => {
        let errorMessage =
          "Erro ao realizar login. Por favor, tente novamente.";
        if (axios.isAxiosError(error) && error.response) {
          // 'error.response.data.message' para acessar a mensagem da API
          // o '??' garante que se 'message' for nulo ou undefined, a mensagem padrão fica
          errorMessage = error.response.data.message ?? errorMessage;
        }
        toast.error(errorMessage);
      },
    });
  };

  if (user) {
    return <h1> Logado: {user.first_name}</h1>;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader className="align-items-center flex justify-center text-center">
              <CardTitle className="text-3xl">Entre na sua conta</CardTitle>
              <CardDescription>
                Entre com a sua conta inserindo os seus dados abaixo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* E-MAIL */}
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* SENHA */}
              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Fazer login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ainda não possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/signup">Crie agora</Link>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
