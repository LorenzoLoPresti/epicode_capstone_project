export interface Ristorante {
  name: string;
  id: number;
  listaChef: Chef[];
  citta: string;
}

interface Chef {
  id: number;
  name: string;
  categoria: string;
  listaProdotti: listaProdotti[];
}

interface listaProdotti {
  id: number;
  categoria: string;
  name: string;
  prezzo: number;
  tipoCottura: string;
}
