import { gameData } from "../db/gameData.js";
import { useState, useEffect } from "react";
import CardPath from "../components/CardPath.jsx";
import { Link } from "react-router-dom";

const { weapons, enemies, floors, paths } = gameData;

export default function FloorPage() {
  const playerName = localStorage.getItem("playerName");

  // Raccogli tutti gli ID usati come "next"
  const allId = paths.map((obj) => obj.options.map((opt) => opt.id)).flat();

  // Filtra i percorsi iniziali
  const rootPaths = paths.filter((p) => !allId.includes(p.id));

  return (
    <>
      <div className="main-img">
        <div className="container">
          <h1 className="pt-5">{paths[0].floor}</h1>

          <div>
            <div className="d-flex flex-column align-items-center justify-content-center text-center">
              <h2 className="fs-1 subtitle">{paths[0].title}</h2>

              {/* Descrizione */}

              <div className="player-detail">
                <h3 className="player-title">Giocatore</h3>
                <p className="player-name">{playerName}</p>
              </div>

              <img
                className="img-paths main-image"
                src={paths[0].image}
                alt=""
              />
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

            <div className="paths">
              <div className="d-flex flex-row justify-content-around">
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
