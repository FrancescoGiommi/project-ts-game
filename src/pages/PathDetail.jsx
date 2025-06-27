import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import paths from "../db/paths";
import CardPath from "../components/CardPath";
import RestartModal from "../components/RestartModal";
import BattleModal from "../components/BattleModal";
import PathModal from "../components/PathModal";
import InventoryModal from "../components/InventoryModal";

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

  const [desktopClicked, setDesktopClicked] = useState(false);
  const [loadingDesktop, setLoadingDesktop] = useState(false);
  const [desktopPathRevealed, setDesktopPathRevealed] = useState(false);

  const [mobileClicked, setMobileClicked] = useState(false);
  const [loadingMobile, setLoadingMobile] = useState(false);
  const [inventoryModal, setInventoryModal] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const playerName = localStorage.getItem("playerName");

  const pathData = paths.find((path) => path.id === id);

  useEffect(() => {
    if (pathData) {
      setIsDead(false);
      setShowButtons(true);
    }
  }, [pathData]);

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

  const renderDesktopButton = () => {
    if (
      isMobile ||
      pathData.isBattle ||
      pathData.deathChance === 0 ||
      desktopClicked
    ) {
      return null;
    }

    return (
      <div className="paths">
        <div className="d-flex justify-content-center mt-4">
          {loadingDesktop ? (
            <div className="text-center mt-3 traversing-text text-message">
              {pathData.isFate}
              <span className="dot-animation">.</span>
            </div>
          ) : (
            <button className="btn btn-danger" onClick={handleDesktopContinue}>
              Prosegui
            </button>
          )}
        </div>
      </div>
    );
  };

  const handleDesktopContinue = () => {
    setLoadingDesktop(true);

    setTimeout(() => {
      const isDeadNow = Math.random() * 100 < pathData.deathChance;
      setIsDead(isDeadNow);
      setDesktopClicked(true); // nasconde il bottone dopo il click
      setLoadingDesktop(false);

      if (isDeadNow) {
        setRestarModal(true); // mostra modale morte
      } else {
        setDesktopPathRevealed(true); // mostra i percorsi
      }
    }, 3000);
  };

  const handleMobileContinue = () => {
    setLoadingMobile(true);
    setMobileClicked(true); // Nasconde il bottone dopo il click

    setTimeout(() => {
      const isDeadNow = Math.random() * 100 < pathData.deathChance;
      setIsDead(isDeadNow);
      setLoadingMobile(false);

      if (isDeadNow) {
        setRestarModal(true);
      } else {
        setMobileModal(true); // mostra modale dei percorsi
      }
    }, 3000);
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

              <p className="description">{pathData.description}</p>
            </div>
            {/* Versione Mobile */}
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
                {!pathData.isBattle && showButtons && (
                  <>
                    {pathData.deathChance > 0 && !mobileClicked && (
                      <div className="paths">
                        <div className="d-flex justify-content-center mt-4">
                          <button
                            className="btn btn-danger"
                            onClick={handleMobileContinue}
                          >
                            Prosegui
                          </button>
                        </div>
                      </div>
                    )}

                    {loadingMobile && (
                      <div className="paths">
                        <div className="text-center mt-3 traversing-text text-message">
                          {pathData.isFate}
                          <span className="dot-animation">.</span>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {pathData.deathChance === 0 && (
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
                {/* Versione Desktop */}
                {!isMobile && !pathData.isBattle && (
                  <>
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
                            className="btn btn-primary"
                            onClick={() => setInventoryModal(true)}
                          >
                            Apri l'inventario
                          </button>
                        </div>
                      </div>
                    </div>
                    {inventoryModal && (
                      <InventoryModal
                        playerName={localStorage.getItem("playerName")}
                        playerImage={localStorage.getItem("playerImage")}
                        onClose={() => setInventoryModal(false)}
                      />
                    )}
                    {renderDesktopButton()}

                    {(pathData.deathChance === 0 ||
                      (desktopPathRevealed && !isDead)) && (
                      <div className="paths">
                        <div className="mt-4 d-flex justify-content-around">
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
                    )}
                  </>
                )}
              </>
            )}

            {restartModal && (
              <RestartModal onClose={() => setRestarModal(false)} />
            )}
          </div>
          {pathData.isBattle && (
            <div className="d-flex justify-content-center btn-container">
              <button
                type="button"
                className="btn btn-primary btn-paths "
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
