import { Ristorante } from "../../pages/Home/Home.types";

export const stringCapitalizer = (string: string) => {
  const firstLetter = string.charAt(0).toUpperCase();
  string = firstLetter + string.slice(1).toLowerCase();
  return string;
};

export const fetchRistorantiPerCitta = async (
  token: string,
  citta: string,
  setRistoranti: React.Dispatch<React.SetStateAction<Ristorante[]>>
) => {
  try {
    const response = await fetch(
      //   `http://localhost:8080//grand_bistrot/ristorante/list/${stringCapitalizer(
      //     citta
      //   )}`,
      "http://localhost:8080/grand_bistrot/ristorante/list/" +
        stringCapitalizer(citta),
      //   `http://localhost:8080/grand_bistrot/users/list`,
      {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setRistoranti(data);
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
