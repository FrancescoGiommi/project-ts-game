import paths from "../db/paths.js";
import weapons from "../db/weapons.js";

import CardPath from "../components/CardPath.jsx";
import { Link } from "react-router-dom";
import PathModal from "../components/PathModal.jsx";
import InventoryModal from "../components/InventoryModal.jsx";
import { useState, useEffect } from "react";

export default function FloorPage() {
  const playerName = localStorage.getItem("playerName");
  const [inventoryModal, setInventoryModal] = useState(false);
  const [mobileModal, setMobileModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobile]);

  // Trova il nodo con id === "start"
  const startPath = paths.find((p) => p.id === "start");

  return (
    <>
      <div className="background-img">
        <div className="container">
          <h1 className="pt-5 floor-title">{startPath?.floor}</h1>

          <div>
            <div className="d-flex flex-column align-items-center justify-content-center text-center">
              <h2 className="fs-1 subtitle">{startPath?.title}</h2>

              <img className="main-image" src={startPath?.image} alt="" />

              <p className="description">
                Benvenuto! La tua arma è uno {weapons[0].name}.
                <br />
                Davanti a te si aprono tre sentieri, quale scegli?
              </p>
            </div>
            {isMobile ? (
              <>
                {/* Inventario versione mobile */}
                <button
                  className="btn btn-primary inventory-btn"
                  onClick={() => setInventoryModal(true)}
                >
                  Inventario
                </button>

                {inventoryModal && (
                  <InventoryModal
                    playerName={localStorage.getItem("playerName")}
                    playerImage={localStorage.getItem("playerImage")}
                    onClose={() => setInventoryModal(false)}
                  />
                )}
                <div>
                  <button
                    className="btn btn-primary btn-paths"
                    onClick={() => setMobileModal(true)}
                    aria-label="Mostra percorsi"
                  >
                    Scegli un percorso
                  </button>
                </div>
                <div className="paths">
                  {mobileModal && (
                    <PathModal
                      options={startPath.options}
                      onClose={() => setMobileModal(false)}
                      isModal={true}
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Inventario versione desktop */}
                <div className="inventory-window">
                  <div className="d-flex flex-row justify-content-around align-items-center">
                    <img
                      className="player-img"
                      src={localStorage.getItem("playerImage")}
                      alt=""
                    />
                    <div className="ms-3">
                      <h2>{localStorage.getItem("playerName")}</h2>
                      <button
                        className="btn btn-primary inventory-btn"
                        onClick={() => setInventoryModal(true)}
                      >
                        Apri l'inventario
                      </button>
                    </div>
                  </div>

                  {inventoryModal && (
                    <InventoryModal
                      playerName={localStorage.getItem("playerName")}
                      playerImage={localStorage.getItem("playerImage")}
                      onClose={() => setInventoryModal(false)}
                    />
                  )}
                </div>

                <div className="paths">
                  <div className="d-flex flex-row justify-content-around">
                    {startPath.options.map((option) => (
                      <Link to={`/floor/${option.id}`} key={option.id}>
                        <CardPath path={option} />
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
