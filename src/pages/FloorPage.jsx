import paths from "../db/paths.js";
import weapons from "../db/weapons.js";

import CardPath from "../components/CardPath.jsx";
import { Link } from "react-router-dom";
import PathModal from "../components/PathModal.jsx";
import { useState, useEffect } from "react";

export default function FloorPage() {
  const playerName = localStorage.getItem("playerName");

  const [mobileModal, setMobileModal] = useState(false);

  // Raccogli tutti gli ID usati come "next"
  const allId = paths.map((obj) => obj.options.map((opt) => opt.id)).flat();

  // Trova i percorsi iniziali (non usati come "next")
  const rootPaths = paths.filter((p) => !allId.includes(p.id));

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

              {/* Dettagli del giocatore (opzionale) */}
              {/* 
              <div className="player-detail">
                <h3 className="player-title">Giocatore</h3>
                <p className="player-name">{playerName}</p>
              </div> 
              */}

              <img className="main-image" src={startPath?.image} alt="" />

              <div>
                <h3 className="player-weapon">Arma</h3>
                <img className="img-weapons" src={weapons[0].image} alt="" />
              </div>

              <p className="description">
                Benvenuto! La tua arma è uno {weapons[0].name}.
                <br />
                Davanti a te si aprono tre sentieri, quale scegli?
              </p>
            </div>
            {startPath.options.length > 2 && (
              <div>
                <button
                  className="btn btn-primary btn-paths"
                  onClick={() => setMobileModal(true)}
                  aria-label="Mostra percorsi"
                >
                  Scegli un percorso
                </button>
              </div>
            )}
            <div className="paths">
              {mobileModal && (
                <PathModal
                  options={startPath.options}
                  onClose={() => setMobileModal(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
