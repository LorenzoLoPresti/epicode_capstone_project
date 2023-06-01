import jsPDF from "jspdf";
import { Ristorante } from "../../pages/Home/Home.types";
import COLORS from "../../style/color";
import logo from "../../assets/whiteLogoNoBg.png";

export const stringCapitalizer = (string: string) => {
  const firstLetter = string.charAt(0).toUpperCase();
  string = firstLetter + string.slice(1).toLowerCase();
  return string;
};

// CERCA RISTORANTI PER CITTA
export const fetchRistorantiPerCitta = async (
  token: string,
  citta: string,
  setRistoranti: React.Dispatch<React.SetStateAction<Ristorante[]>>
) => {
  try {
    const response = await fetch(
      "http://localhost:8080/grand_bistrot/ristorante/list/" +
        stringCapitalizer(citta),
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

export const generatePDF = (
  username: string,
  chefName: string | undefined,
  numeroCommensali: number,
  data: string | null,
  prezzoChef: number,
  prezzoTotale: number
) => {
  const doc = new jsPDF();

  const imageSrc = logo;

  const imgWidth = 50;
  const imgHeight = 27;

  const centraLogo = (doc.internal.pageSize.getWidth() - imgWidth) / 2;

  doc.addImage(imageSrc, "JPEG", centraLogo, 10, imgWidth, imgHeight);
  doc.setFont("Montserrat");
  doc.setFontSize(14);
  doc.setTextColor(COLORS.brandBlack);
  const linesWidth = doc.internal.pageSize.getWidth() - 20;
  doc.setLineWidth(0.3); // Imposta lo spessore della linea a 2
  doc.setDrawColor(COLORS.brandGold); // Imposta il colore della linea a rosso
  doc.line(20, 42, linesWidth, 42); // Linea orizzontale da (20, 20) a (100, 20)

  doc.text(`Cliente: ${username}`, 20, 60);
  doc.text(`Chef scelto: ${chefName}`, 20, 70);
  doc.text(`Numero di partecipanti: ${numeroCommensali}`, 20, 80);
  doc.text(`Data cena: ${data}`, 20, 90);

  doc.line(20, 105, linesWidth, 105);
  doc.text(`Tariffa Chef: ${prezzoChef}€`, 20, 123);
  doc.setFontSize(18);
  doc.text(`Totale: ${prezzoTotale}€`, 20, 138);

  doc.setFontSize(14);
  doc.text(`Grazie per aver scelto GrandBistrot Homecooking!`, 20, 158);
  doc.text(`2021/04/23`, linesWidth - 25, 178);

  const generatedPdfData = doc.output("blob");
  return generatedPdfData;
};
