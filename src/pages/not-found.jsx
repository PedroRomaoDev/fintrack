import { Link } from "react-router";

import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-foreground">
      <h1 className="text-6xl font-bold text-primary-green md:text-9xl">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-foreground md:text-4xl">
        Página Não Encontrada
      </h2>
      <p className="text-md mt-2 text-muted-foreground md:text-lg">
        Oops! A página que você está procurando não existe ou foi movida.
      </p>
      <div className="py-4">
        <Button variant="outline">
          <Link
            to="/"
            className="rounded-lg px-6 py-3 font-semibold text-primary-foreground shadow-md transition-opacity duration-300 hover:opacity-90"
          >
            Voltar para a Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
