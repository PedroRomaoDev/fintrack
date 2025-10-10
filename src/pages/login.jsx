import { Loader2Icon } from "lucide-react";
import { Link, Navigate } from "react-router";

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
import { useAuthContext } from "@/contexts/auth";
import { useLoginForm } from "@/forms/hooks/user";

const LoginPage = () => {
  // const {user: userTest} = useContext(AuthContext);
  const { user, login, isInitializing, isLoginPending } = useAuthContext();

  const { form } = useLoginForm();

  const handleSubmit = (data) => login(data);

  if (isInitializing) {
    return null;
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                control={form.control}
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
                control={form.control}
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
              <Button className="w-full" disabled={isLoginPending}>
                {isLoginPending && <Loader2Icon className="animate-spin" />}
                Fazer login
              </Button>
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
