import { gameData } from "../db/gameData.js";
import { useState, useEffect } from "react";
import CardPath from "../components/CardPath.jsx";
import { Link } from "react-router-dom";

const { weapons, enemies, floors, paths } = gameData;

export default function FloorPage() {
  const playerName = localStorage.getItem("playerName");

  // Raccogli tutti gli ID usati come "next"
  const allNext = paths.map((obj) => obj.options.map((opt) => opt.next)).flat();

  // Filtra i percorsi iniziali
  const rootPaths = paths.filter((p) => !allNext.includes(p.id));

  return (
    <>
      <div className="main-img">
        <div className="container">
          <h1 className="pt-5">Primo piano</h1>

          <div>
            <div className="d-flex flex-column align-items-center justify-content-center text-center">
              <h2 className="fs-1 subtitle">{floors[0].name}</h2>

              {/* Descrizione */}

              <img
                className="img-paths main-image"
                src={floors[0].image}
                alt=""
              />
              <img className="img-weapons" src={weapons[0].image} alt="" />

              <p className="description">
                Benvenuto {playerName}! La tua arma è uno {weapons[0].name}.
                <br />
                Davanti a te si aprono tre sentieri, quale scegli?
              </p>
            </div>

            <div className="d-flex flex-row justify-content-around paths">
              <div className="d-flex flex-row">
                {rootPaths.map((path) => (
                  <Link to={`/floor/${path.id}`} key={path.id}>
                    <CardPath path={path} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
