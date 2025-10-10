import { useQueryClient } from "@tanstack/react-query";
import { addMonths, format, isValid } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { useAuthContext } from "@/contexts/auth";

import { DatePickerWithRange } from "./ui/date-picker-with-range";

const getInitialDateState = (searchParams) => {
  const defaultDate = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  };
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  if (!from || !to) {
    return defaultDate;
  }

  // neste ponto, eu tenho o from e o to
  // eles são válidos?
  const datesAreInvalid = !isValid(new Date(from)) || !isValid(new Date(to));
  // se não forem válidos, eu retorno o defaultDate
  if (datesAreInvalid) {
    return defaultDate;
  }

  // neste ponto, ambas as datas são válidas
  return {
    from: new Date(from + "T00:00:00"),
    to: new Date(to + "T00:00:00"),
  };
};

const DateSelection = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(getInitialDateState(searchParams));

  // 1- sempre que o state 'date' mudar, eu preciso persisti-lo na URL (?from&to=)
  // 2- quando eu recarregar a página, eu preciso ler esses valores da URL e persistir o state com eles
  useEffect(() => {
    // early return
    if (!date?.from || !date?.to) {
      return;
    }

    const queryParams = new URLSearchParams();
    queryParams.set("from", format(date.from, "yyyy-MM-dd"));
    queryParams.set("to", format(date.to, "yyyy-MM-dd"));

    if (date.from && date.to) {
      navigate(`/home?${queryParams.toString()}`);
      queryClient.invalidateQueries({
        queryKey: [
          "balance",
          user.id,
          format(date.from, "yyyy-MM-dd"),
          format(date.to, "yyyy-MM-dd"),
        ],
        // exact: true, // padrão é falso
      });
    }
  }, [navigate, date, queryClient, user.id]);

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelection;
