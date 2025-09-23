import { addMonths, format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { DatePickerWithRange } from "./ui/date-picker-with-range";

const DateSelection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [date, setDate] = useState({
    from: searchParams.get("from")
      ? new Date(searchParams.get("from") + "T00:00:00")
      : new Date(),
    to: searchParams.get("from")
      ? new Date(searchParams.get("to") + "T00:00:00")
      : addMonths(new Date(), 1),
  });

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
      navigate(`/?${queryParams.toString()}`);
    }
  }, [navigate, date]);

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelection;
