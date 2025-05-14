import { gameData } from "../db/gameData.js";
import { useState, useEffect } from "react";
import CardPath from "../components/CardPath.jsx";
import { Link } from "react-router-dom";

const { weapons, enemies, floors } = gameData;

export default function FloorPage() {
  const playerName = localStorage.getItem("playerName");

  return (
    <>
      <div className="main-img">
        <div className="container">
          <h1 className="pt-5">Primo piano</h1>

          <div>
            <div className="d-flex flex-column align-items-center justify-content-center text-center">
              <h2 className="fs-1 subtitle">{floors[0].name}</h2>

              {/* Descrizione */}
              <p className="description">
                Benvenuto {playerName}! La tua arma è uno {weapons[0].name}.
                Davanti a te si aprono tre sentieri, quale scegli?
              </p>
            </div>

            <div className="d-flex flex-row justify-content-around paths">
              <div className="d-flex flex-row">
                {floors[0].paths.map((path) => (
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
