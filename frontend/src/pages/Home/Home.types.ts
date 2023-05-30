// TIPO RISTORANTE
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

// TIPO CHEF
export interface Chef {
  id: number;
  name: string;
  categoria: string;
  tariffaOraria: number;
  immagineProfilo: string;
  immagineCucina: string;
  listaMenu: ListaMenu[];
}

// TIPO LISTAMENU
export interface ListaMenu {
  id: number;
  selezione: ListaProdotti[];
}

// TIPO LISTAPRODOTTI
export interface ListaProdotti {
  id: number;
  categoria: string;
  name: string;
  prezzo: number;
  descrizione: string;
  tipoCottura: string;
  tempoDiPreparazione: number;
  tipoBevanda: string;
}
