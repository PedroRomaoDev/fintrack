import { Navigate } from "react-router";

import AddTransacionButton from "@/components/add-transaction-button";
import Balance from "@/components/balance";
import DateSelection from "@/components/date-selection";
import Header from "@/components/header";
import TransactionTypeChart from "@/components/transaction-type-chart";
import TransactionsTable from "@/components/transactions-table";
import { useAuthContext } from "@/contexts/auth";

const HomePage = () => {
  const { user, isInitializing } = useAuthContext();
  if (isInitializing) {
    return null;
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Header />
      <div className="space-y-6 p-8">
        {/* PARTE DO TOPO  */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="flex items-center gap-2">
              <DateSelection />

              <AddTransacionButton />
            </div>
          </div>
        </div>
        {/* GRAFICOS ETC */}
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          <Balance />
          <TransactionTypeChart />
        </div>
        <TransactionsTable />
      </div>
    </>
  );
};

export default HomePage;
