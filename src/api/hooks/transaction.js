import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuthContext } from "@/contexts/auth";

import { TransactionService } from "../services/transaction";
import { getUserBalanceQueryKey } from "./user";

export const createTransactionMutationKey = ["createTransaction"];

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: (input) => TransactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
      });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Ocorreu um erro ao criar a transação. Tente novamente.",
      );
    },
  });
};
