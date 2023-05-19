import { useState } from "react";
import styles from "./AccordionMenu.module.css";
import { BiPlus } from "react-icons/bi";
import { AiOutlineMinus } from "react-icons/ai";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { ListaProdotti } from "../../pages/Home/Home.types";
import React from "react";

const AccordionMenu = ({
  selezione,
  opzione,
  setMenuSelected,
}: {
  selezione: ListaProdotti[];
  opzione: number;
  setMenuSelected: React.Dispatch<React.SetStateAction<ListaProdotti[]>>;
}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(false);

  const filtraListaPerPortata = (portata: string) => {
    return selezione?.filter((p) => p.categoria === portata.toUpperCase());
  };

  const menu = selezione?.filter((p) => p?.categoria !== "BEVANDA");

  return (
    <div>
      <div
        className={`${styles.accordionBg} ${
          selected && styles.accordionBgSelected
        } px-3 `}
        onClick={() => setVisible(!visible)}
      >
        <div
          className={`d-flex justify-content-between align-items-center`}
          style={{ cursor: "pointer" }}
        >
          <p className="mb-0">
            Opzione {opzione}
            {selected && <span className="ms-3">(Selezionato)</span>}
          </p>

          {(!visible && <BiPlus />) || <AiOutlineMinus />}
        </div>
        {visible && (
          <div className={`${styles.accordionBody} pt-3`}>
            <div>
              <div>
                {filtraListaPerPortata("antipasto")?.length > 0 && (
                  <h5>
                    <VscDebugBreakpointLog
                      className={`me-1 mb-1 ${styles.icons}`}
                    />
                    Prima portata
                  </h5>
                )}
                {filtraListaPerPortata("antipasto")?.length > 0 &&
                  filtraListaPerPortata("antipasto")?.map((piatto, i) => (
                    <React.Fragment key={"antipasto: " + i}>
                      <p className={`mb-1 ${styles.dishNameOptions}`}>
                        {piatto?.name}
                      </p>
                      <p className={`fs-6 ${styles.dishDescription}`}>
                        {piatto?.descrizione || "descrizione"}
                      </p>
                    </React.Fragment>
                  ))}
                {filtraListaPerPortata("primo")?.length > 0 && (
                  <h5>
                    <VscDebugBreakpointLog
                      className={`me-1 mb-1 ${styles.icons}`}
                    />
                    Prima portata
                  </h5>
                )}
                {filtraListaPerPortata("primo")?.length > 0 &&
                  filtraListaPerPortata("primo")?.map((piatto, i) => (
                    <React.Fragment key={"primo: " + i}>
                      <p className={`mb-1 ${styles.dishNameOptions}`}>
                        {piatto?.name}
                      </p>
                      <p className={`fs-6 ${styles.dishDescription}`}>
                        {piatto?.descrizione || "descrizione"}
                      </p>
                    </React.Fragment>
                  ))}
                {filtraListaPerPortata("secondo")?.length > 0 && (
                  <h5>
                    <VscDebugBreakpointLog
                      className={`me-1 mb-1 ${styles.icons}`}
                    />
                    Seconda portata
                  </h5>
                )}
                {filtraListaPerPortata("secondo")?.length > 0 &&
                  filtraListaPerPortata("secondo")?.map((piatto, i) => (
                    <React.Fragment key={"secondo: " + i}>
                      <p className={`mb-1 ${styles.dishNameOptions}`}>
                        {piatto?.name}
                      </p>
                      <p className={`fs-6 ${styles.dishDescription}`}>
                        {piatto?.descrizione || "descrizione"}
                      </p>
                    </React.Fragment>
                  ))}
                {filtraListaPerPortata("dolce")?.length > 0 && (
                  <h5>
                    <VscDebugBreakpointLog
                      className={`me-1 mb-1 ${styles.icons}`}
                    />
                    Dolce
                  </h5>
                )}
                {filtraListaPerPortata("dolce")?.length > 0 &&
                  filtraListaPerPortata("dolce")?.map((piatto, i) => (
                    <React.Fragment key={"dolce: " + i}>
                      <p className={`mb-1 ${styles.dishNameOptions}`}>
                        {piatto?.name}
                      </p>
                      <p className={`fs-6 ${styles.dishDescription}`}>
                        {piatto?.descrizione || "descrizione"}
                      </p>
                    </React.Fragment>
                  ))}
              </div>
              <div className="w-100 d-flex justify-content-end">
                {!selected && (
                  <div>
                    <button
                      onClick={() => {
                        setMenuSelected(menu);
                        setSelected(true);
                      }}
                    >
                      Seleziona menu
                    </button>
                  </div>
                )}
                {selected && (
                  <div>
                    <button
                      onClick={() => {
                        setMenuSelected([]);
                        setSelected(false);
                      }}
                    >
                      Deseleziona menu
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionMenu;
