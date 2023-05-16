export interface Ristorante {
  name: string;
  id: number;
  listaChef: Chef[];
  citta: string;
  telefono: string;
  immagine: string;
  indirizzo: string;
  descrizione: string;
  menu_img: string;
}

export interface Chef {
  id: number;
  name: string;
  categoria: string;
  listaProdotti: listaProdotti[];
}

export interface listaProdotti {
  id: number;
  categoria: string;
  name: string;
  prezzo: number;
  tipoCottura: string;
}
