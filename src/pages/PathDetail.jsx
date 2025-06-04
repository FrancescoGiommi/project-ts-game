import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { gameData } from "../db/gameData";
import CardPath from "../components/CardPath";
import RestartModal from "../components/RestartModal";
import BattleModal from "../components/BattleModal";

export default function PathDetail({ path }) {
  const { id } = useParams();

  const { weapons, enemies, floors, paths } = gameData;

  const [restartModal, setRestarModal] = useState(false);
  const [battleModal, setBattleModal] = useState(false);
  const [battleResult, setBattleResult] = useState(null);

  const playerName = localStorage.getItem("playerName");

  const pathData = paths.find((path) => path.id === id);

  // Funzione per il combattimento (lancio di un dado)
  const handleBattle = () => {
    const playerDice = Math.floor(Math.random() * 6) + 1;
    const enemyDice = Math.floor(Math.random() * 6) + 1;

    let result = "";
    if (playerDice > enemyDice) {
      result = "Hai vinto!";
    } else if (playerDice < enemyDice) {
      result = "Hai perso!";
    } else {
      result = "Pareggio!";
    }

    setBattleResult(result);
  };

  if (!pathData) {
    return <h1>Percorso non trovato</h1>;
  }
  console.log("pathData:", pathData);
  console.log("isBattle:", pathData?.isBattle);

  return (
    <>
      <div className="main-img">
        <div className="container">
          <h1 className="pt-5">Primo piano</h1>

          <div>
            <div className="d-flex flex-column align-items-center justify-content-center text-center">
              <h3 className="fs-1 subtitle">{pathData.title}</h3>

              <div className="player-detail">
                <h3 className="player-title">Giocatore</h3>
                <p className="player-name">{playerName}</p>
              </div>

              {/* Descrizione */}
              <img
                className="img-paths main-image"
                src={pathData.imagePath1}
                alt=""
              />
              <p className="description">{pathData.narration}</p>
            </div>

            <div className=" paths">
              <div className=" d-flex flex-row- justify-content-around">
                {pathData.options.map((path, index) => (
                  <Link to={`/floor/${path.next}`} key={index}>
                    <CardPath
                      path={{
                        description: path.description,
                        image: path.image,
                      }}
                    />
                  </Link>
                ))}
              </div>
              {/* Mostra il bottone se si muore */}
              {pathData.isDeath && (
                <div className="d-flex justify-content-center mt-4">
                  <button
                    className="btn btn-danger death-button fs-1"
                    onClick={() => setRestarModal(true)}
                  >
                    Sei Morto <i className="fa-solid fa-skull-crossbones"></i>
                  </button>
                </div>
              )}
            </div>
            {restartModal && (
              <RestartModal onClose={() => setRestarModal(false)} />
            )}
          </div>
          {pathData.isBattle && (
            <div className="d-flex justify-content-center mt-4">
              <button
                type="button"
                class="btn btn-primary fs-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setBattleModal(true)}
              >
                ⚔️ Combatti
              </button>
            </div>
          )}
        </div>
        <BattleModal
          onClose={() => setBattleModal(false)}
          onBattle={handleBattle}
          result={battleResult}
        />
      </div>
    </>
  );
}
