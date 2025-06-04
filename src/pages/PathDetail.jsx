import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import paths from "../db/paths";
import weapons from "../db/weapons";
import CardPath from "../components/CardPath";
import RestartModal from "../components/RestartModal";
import BattleModal from "../components/BattleModal";

export default function PathDetail({ path }) {
  const { id } = useParams();

  const [restartModal, setRestarModal] = useState(false);
  const [battleModal, setBattleModal] = useState(false);
  const [playerDice, setPlayerDice] = useState(null);
  const [enemyDice, setEnemyDice] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [playerHealth, setPlayerHealth] = useState(5);
  const [enemyHealth, setEnemyHealth] = useState(5);

  const playerName = localStorage.getItem("playerName");

  const pathData = paths.find((path) => path.id === id);

  // Funzione per il combattimento (lancio di un dado)

  const handleBattle = () => {
    // Dadi del gioccatore e del nemico
    const newPlayerDice = Math.floor(Math.random() * 6) + 1;
    const newEnemyDice = Math.floor(Math.random() * 6) + 1;

    setPlayerDice(newPlayerDice);
    setEnemyDice(newEnemyDice);

    let result = "";
    if (newPlayerDice > newEnemyDice) {
      setEnemyHealth((prev) => Math.max(prev - 1, 0));

      result = `Hai vinto!`;
    } else if (newPlayerDice < newEnemyDice) {
      setPlayerHealth((prev) => Math.max(prev - 1, 0));
      result = `Hai perso!`;
    } else {
      result = `Hai parato!`;
    }

    setBattleResult(result);
  };

  if (!pathData) {
    return <h1>Percorso non trovato</h1>;
  }

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

              <img
                className="img-paths main-image"
                src={pathData.image}
                alt=""
              />

              <div>
                <h3 className="player-weapon">Arma</h3>
                <img className="img-weapons" src={weapons[0].image} alt="" />
              </div>

              <p className="description">{pathData.description}</p>
            </div>

            <div className="paths">
              <div className=" d-flex flex-row- justify-content-around">
                {pathData.options.map((path, index) => (
                  <Link to={`/floor/${path.id}`} key={index}>
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
              {pathData.deathChance && (
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
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary fs-1"
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
          battle={handleBattle}
          result={battleResult}
          playerDice={playerDice}
          enemyDice={enemyDice}
          playerHealth={playerHealth}
          enemyHealth={enemyHealth}
        />
      </div>
    </>
  );
}
