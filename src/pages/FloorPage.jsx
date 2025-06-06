import paths from "../db/paths.js";
import weapons from "../db/weapons.js";

import CardPath from "../components/CardPath.jsx";
import { Link } from "react-router-dom";

export default function FloorPage() {
  const playerName = localStorage.getItem("playerName");

  // Raccogli tutti gli ID usati come "next"
  // const allId = paths.map((obj) => obj.options.map((opt) => opt.id)).flat();

  const allId = paths.map((obj) => obj.options.map((opt) => opt.id)).flat();

  const rootPaths = paths.filter((p) => !allId.includes(p.id));

  // Filtra i percorsi iniziali
  // const rootPaths = paths.filter((p) => !allId.includes(p.id));

  return (
    <>
      <div className="background-img">
        <div className="container">
          <h1 className="pt-5 floor-title">{paths[0].floor}</h1>

          <div>
            <div className="d-flex flex-column align-items-center justify-content-center text-center">
              <h2 className="fs-1 subtitle">{paths[0].title}</h2>

              {/* Descrizione */}

              {/* <div className="player-detail">
                <h3 className="player-title">Giocatore</h3>
                <p className="player-name">{playerName}</p>
              </div> */}

              <img className="main-image" src={paths[0].image} alt="" />

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
              <div className="d-flex flex-row justify-content-around gap-4">
                {paths[0].options.map((option) => (
                  <Link to={`/floor/${option.id}`} key={option.id}>
                    <CardPath path={option} />
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
