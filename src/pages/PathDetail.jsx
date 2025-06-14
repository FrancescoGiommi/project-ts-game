import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import paths from "../db/paths";
import weapons from "../db/weapons";
import CardPath from "../components/CardPath";
import RestartModal from "../components/RestartModal";
import BattleModal from "../components/BattleModal";
import PathModal from "../components/PathModal";

export default function PathDetail({ path }) {
  /* Prendo l'id dall'URL con useParams */
  const { id } = useParams();

  /* Modale per ricominciare */
  const [restartModal, setRestarModal] = useState(false);

  /* Modale per combattere */
  const [battleModal, setBattleModal] = useState(false);

  /* Davdo del player */
  const [playerDice, setPlayerDice] = useState(null);

  /* Dado del nemico */
  const [enemyDice, setEnemyDice] = useState(null);

  /* Risultato della battaglia */
  const [battleResult, setBattleResult] = useState(null);

  /* Barra della vita del player */
  const [playerHealth, setPlayerHealth] = useState(20);

  /* Barra della vita del nemico */
  const [enemyHealth, setEnemyHealth] = useState(20);

  /* Modale per il mobile */
  const [mobileModal, setMobileModal] = useState(false);

  const [showButtons, setShowButtons] = useState(false);
  const [isDead, setIsDead] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const playerName = localStorage.getItem("playerName");

  const pathData = paths.find((path) => path.id === id);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dead = Math.random() * 100 < pathData.deathChance;
      setIsDead(dead);
      setShowButtons(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [pathData.deathChance]);

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

  //! Funzione per il combattimento (lancio di un dado)
  const handleBattle = () => {
    // Tiro dei dadi
    const newPlayerDice = Math.floor(Math.random() * 6) + 1;
    const newEnemyDice = Math.floor(Math.random() * 6) + 1;

    // Set dei dadi
    setPlayerDice(newPlayerDice);
    setEnemyDice(newEnemyDice);

    // Stato temporaneo delle vite
    let updatedPlayerHealth = playerHealth;
    let updatedEnemyHealth = enemyHealth;

    // Risultato della battaglia
    let result = "";

    // Calcolo danni
    if (newPlayerDice > newEnemyDice) {
      updatedEnemyHealth = Math.max(enemyHealth - 1, 0);
      result = `Hai colpito il nemico!`;
    } else if (newPlayerDice < newEnemyDice) {
      updatedPlayerHealth = Math.max(playerHealth - 1, 0);
      result = `Hai subito un colpo!`;
    } else {
      result = `Hai parato!`;
    }

    // Aggiorna gli stati
    setPlayerHealth(updatedPlayerHealth);
    setEnemyHealth(updatedEnemyHealth);

    // Controllo fine partita
    if (updatedPlayerHealth === 0) {
      result = "Sei morto!";
      setBattleModal(false);
      setRestarModal(true);
    } else if (updatedEnemyHealth === 0) {
      result = "Hai vinto!";
      setBattleModal(false);
    }

    // Mostra il risultato
    setBattleResult(result);
  };

  /* Se non c'è il percorso mostro un messaggio */
  if (!pathData) {
    return <h1>Percorso non trovato</h1>;
  }

  return (
    <>
      <div className="background-img">
        <div className="container">
          <h1 className="pt-5 floor-title">{paths[0].floor}</h1>

          <div>
            <div className="d-flex flex-column align-items-center justify-content-center text-center">
              <h3 className="fs-1 subtitle">{pathData.title}</h3>

              <img className="main-image" src={pathData.image} alt="" />

              <div>
                <h3 className="player-weapon">Arma</h3>
                <img className="img-weapons" src={weapons[0].image} alt="" />
              </div>

              <p className="description">{pathData.description}</p>
            </div>
            {/* Versione Mobile */}
            {isMobile ? (
              <>
                {!pathData.isBattle && showButtons && (
                  <>
                    {isDead ? (
                      <div className="d-flex justify-content-center mt-4">
                        <button
                          className="btn btn-danger death-button fs-1"
                          onClick={() => setRestarModal(true)}
                        >
                          Sei Morto{" "}
                          <i className="fa-solid fa-skull-crossbones"></i>
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="btn btn-primary btn-paths fs-1"
                          onClick={() => setMobileModal(true)}
                          aria-label="Mostra percorsi"
                        >
                          Scegli un percorso
                        </button>
                      </div>
                    )}
                  </>
                )}

                {pathData.deathChance === 0 && (
                  <div>
                    <button
                      className="btn btn-primary btn-paths fs-1"
                      onClick={() => setMobileModal(true)}
                      aria-label="Mostra percorsi"
                    >
                      Scegli un percorso
                    </button>
                  </div>
                )}
                <div className="paths">
                  {/* Modale per scegliere il percorso */}
                  {mobileModal && (
                    <PathModal
                      options={pathData.options}
                      onClose={() => setMobileModal(false)}
                      isModal={true}
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="paths">
                  <div className="d-flex flex-row justify-content-around">
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
                </div>
                {/* Versione Desktop */}
                <div className="paths">
                  {/* Mostra il bottone se si muore */}
                  {showButtons && !pathData.isBattle && (
                    <>
                      {isDead ? (
                        <div className="d-flex justify-content-center mt-4">
                          <button
                            className="btn btn-danger death-button fs-1"
                            onClick={() => setRestarModal(true)}
                          >
                            Sei Morto{" "}
                            <i className="fa-solid fa-skull-crossbones"></i>
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button
                            className="btn btn-primary btn-paths fs-1"
                            onClick={() => setMobileModal(true)}
                            aria-label="Mostra percorsi"
                          >
                            Scegli un percorso
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}

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
