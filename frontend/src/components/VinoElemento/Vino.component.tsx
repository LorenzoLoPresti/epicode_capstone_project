import { useState } from "react";
import { ListaProdotti } from "../../pages/Home/Home.types";
import styles from "./Vino.module.css";
import { BiPlus } from "react-icons/bi";
import { AiOutlineMinus } from "react-icons/ai";

const Vino = ({
  vino,
  nomeVino,
  listaViniScelti,
  setListaViniScelti,
  onClick,
}: {
  vino: ListaProdotti;
  nomeVino: string;
  listaViniScelti: ListaProdotti[];
  setListaViniScelti: React.Dispatch<React.SetStateAction<ListaProdotti[]>>;
  onClick: () => void;
}) => {
  const [numeroBottiglie, setNumeroBottiglie] = useState(0);
  //   const [bottiglieSelezionate, setBottiglieSelezionate] = useState<
  //     ListaProdotti[]
  //   >([]);

  const aggiungiBottiglia = () => {
    if (nomeVino === vino?.name) {
      if (numeroBottiglie < 8) setNumeroBottiglie(numeroBottiglie + 1);
      //   setBottiglieSelezionate([...listaViniScelti]);
      setListaViniScelti([...listaViniScelti, vino]);
      //   console.log(bottiglieSelezionate);

      //   for (let i = 0; i < numeroBottiglie; i++) {
      //     setBottiglieSelezionate([...bottiglieSelezionate, vino]);
      //   }
    }
    // setCartaVini([...cartaVini, ...bottiglieSelezionate]);
  };
  const rimuoviBottiglia = () => {
    if (nomeVino === vino?.name) {
      if (numeroBottiglie > 0) setNumeroBottiglie(numeroBottiglie - 1);
    }
    const indiceProdotto = listaViniScelti?.findIndex(
      (prodotto) => prodotto?.id === vino?.id
    );

    if (indiceProdotto !== -1) {
      const nuovaLista = [...listaViniScelti];
      nuovaLista.splice(indiceProdotto, 1);
      setListaViniScelti(nuovaLista);
    } else {
      setListaViniScelti([...listaViniScelti]);
    }
  };

  //   const rimuoviDalCarrello = () => {
  //     const indiceProdotto = listaViniScelti?.findIndex(
  //       (prodotto) => prodotto?.id === vino?.id
  //     );

  //     if (indiceProdotto !== -1) {
  //       const nuovaLista = [...listaViniScelti];
  //       nuovaLista.splice(indiceProdotto, 1);
  //       setListaViniScelti(nuovaLista);
  //     } else {
  //       setListaViniScelti([...listaViniScelti]);
  //     }
  //   };

  return (
    <div className={` text-light ${styles.vinoOptions}`}>
      <div className="d-flex justify-content-between">
        <p
          onClick={onClick}
          className="fs-5"
          style={{ fontStyle: "italic", color: "#ccb7a9" }}
        >
          {vino?.name}
        </p>
        <p onClick={onClick}>
          {(vino?.name === nomeVino && <AiOutlineMinus />) || <BiPlus />}
        </p>
      </div>

      {nomeVino === vino?.name && (
        <>
          <p>{vino?.descrizione}</p>
          <div className="w-100 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <p className="mb-0">Prezzo: {vino?.prezzo}.00€</p>
            </div>

            <div className="text-light text-center d-flex align-items-center">
              <button
                className={`px-1 ms-1 ${
                  numeroBottiglie > 0 && styles.commensaliBtn
                } ${numeroBottiglie <= 0 && styles.btnDisabled}`}
                onClick={rimuoviBottiglia}
              >
                <AiOutlineMinus className={`${styles.btnContent}`} />
              </button>
              <span className="px-1 fs-3" style={{ width: "1.6rem" }}>
                {numeroBottiglie}
              </span>
              <button
                className={`px-1 me-1 ${
                  numeroBottiglie < 8 && styles.commensaliBtn
                } ${numeroBottiglie >= 8 && styles.btnDisabled}`}
                onClick={aggiungiBottiglia}
              >
                <BiPlus className={`${styles.btnContent}`} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Vino;