import { gameData } from "../db/gameData.js";
import { useState, useEffect } from "react";

const { weapons, enemies, floors } = gameData;

export default function FloorPage() {
  console.log(floors);
  console.log(floors.name);

  const playerName = localStorage.getItem("playerName");

  return (
    <>
      <div className="main-img">
        <div className="container">
          <h1 className="pt-5">Primo piano</h1>

          <div>
            <div className="d-flex flex-column align-items-center justify-content-center text-center">
              <h2 className="fs-1 subtitle">{floors[0].name}</h2>

              <p className="description">
                {playerName} la tua arma è uno {weapons[0].name}. Davanti a te
                si aprono tre sentieri, quale scegli?
              </p>
            </div>

            <div className="d-flex flex-row justify-content-around paths">
              <div className="d-flex flex-column">
                <img
                  className="img-paths mb-3"
                  src="/public/img/goblin.jpg"
                  alt=""
                />
                <button className="paths-button">
                  {floors[0].paths[0].description}
                </button>
              </div>
              <div className="d-flex flex-column">
                <img
                  className="img-paths mb-3"
                  src="/public/img/cripta.jpg"
                  alt=""
                />
                <button className="paths-button">
                  {floors[0].paths[1].description}
                </button>
              </div>
              <div className="d-flex flex-column">
                <img
                  className="img-paths mb-3"
                  src="/public/img/castello.jpg"
                  alt=""
                />
                <button className="paths-button">
                  {floors[0].paths[2].description}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
