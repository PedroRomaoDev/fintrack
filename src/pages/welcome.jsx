import { LogInIcon } from "lucide-react";
import { Link } from "react-router";

import fintrack from "@/assets/images/fintrack.png";
import logo from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth";

const WelcomePage = () => {
  const { isInitializing } = useAuthContext();
  if (isInitializing) {
    return null;
  }

  return (
    <div className="grid h-full grid-cols-2">
      {/* ESQUERDA */}

      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <img
          src={logo}
          alt="FinTrack"
          width={173}
          height={39}
          className="mb-8"
        />

        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A FinTrack é uma plataforma de gestão financeira para monitorar suas
          movimentações e oferecer insights personalizados, facilitando o
          controle do seu orçamento.
        </p>

        <Button variant="outline">
          <LogInIcon className="mr-2" />
          <Link to="/login">Fazer login ou criar conta</Link>
        </Button>
      </div>

      {/* DIREITA */}
      <div className="relative h-screen w-full">
        <img
          src={fintrack}
          alt="Faça login"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default WelcomePage;
