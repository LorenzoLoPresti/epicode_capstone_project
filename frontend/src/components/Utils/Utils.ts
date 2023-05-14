export const stringCapitalizer = (string: string) => {
  const firstLetter = string.charAt(0).toUpperCase();
  string = firstLetter + string.slice(1).toLowerCase();
  return string;
};

export const fetchRistorantiPerCitta = async (
  token: string,
  citta: string,
  setRistoranti: React.Dispatch<React.SetStateAction<never[]>>
) => {
  try {
    const response = await fetch(
      //   `http://localhost:8080//grand_bistrot/users/citta/${stringCapitalizer(
      //     citta
      //   )}`,
      `http://localhost:8080/grand_bistrot/users/list`,
      {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }
    );
    console.log(citta);
    if (response.ok) {
      const data = await response.json();
      setRistoranti(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
