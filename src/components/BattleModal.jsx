import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function BattleModal({
  result,
  battle,
  playerDice,
  enemyDice,
  playerHealth,
  enemyHealth,
}) {
  const navigate = useNavigate();

  const handleRestart = () => {
    // Vai alla home
    navigate("/floor");
  };

  useEffect(() => {
    return () => {
      // Cleanup su smontaggio
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.remove();
    };
  }, []);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop={playerHealth === 0 ? "static" : "true"}
      data-bs-keyboard={playerHealth === 0 ? "false" : "true"}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Combatti!
            </h1>
          </div>
          <div className="modal-body">
            <p className="text-center">Lancia il dado e sfida il nemico!</p>
            <div className="d-flex flex-column justify-content-center mt-4">
              <div className="d-flex dlex-row justify-content-around">
                <div className="d-flex flex-column align-items-center">
                  {/* Barra salute del player */}
                  <div className="health-bar-container">
                    <div
                      className="health-bar"
                      style={{ width: `${(playerHealth / 20) * 100}%` }}
                    ></div>
                  </div>

                  {/* Immagine player */}
                  <img
                    className="player-img-battle mb-3"
                    src={localStorage.getItem("playerImage")}
                    alt="player image"
                  />

                  {playerDice !== null && <p className="fs-1">{playerDice}</p>}
                </div>
                <div className="d-flex flex-column align-items-center">
                  {/* Barra salute del nemico */}
                  <div className="health-bar-container">
                    <div
                      className="health-bar"
                      style={{ width: `${(enemyHealth / 20) * 100}%` }}
                    ></div>
                  </div>

                  {/* Immaigine nemico */}
                  <img
                    className="orco-img mb-3"
                    src="/img/orco_img.jpg"
                    alt="enemy image"
                  />

                  {enemyDice !== null && <p className="fs-1">{enemyDice}</p>}
                </div>
              </div>

              {/* Se la vita del giocatore è scesa a 0 o la vita del nemico è scesa a 0, disabilito il bottone */}
              {playerHealth === 0 || enemyHealth === 0 ? (
                <button
                  type="button"
                  className="btn btn-primary w-50 mx-auto"
                  onClick={battle}
                  disabled={
                    // (playerHealth === 0 && enemyHealth > 0) ||
                    // (enemyHealth === 0 && playerHealth > 0)
                    true
                  }
                >
                  ⚔️ Lancia il dado
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary w-50 mx-auto"
                  onClick={battle}
                >
                  ⚔️ Lancia il dado
                </button>
              )}
            </div>
            {result && (
              <div className="mt-4">
                <h2 className="text-center">Risultato della battaglia:</h2>
                <p className="text-center fs-3">{result}</p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            {/* Faccio comparire il bottone 'chiudi' solo se vinco la battaglia */}
            {enemyHealth === 0 && playerHealth > 0 && (
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Chiudi
              </button>
            )}
            {/* Faccio comparire il bottone 'ricomincia' solo se perdo la battaglia */}
            {playerHealth === 0 && enemyHealth > 0 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleRestart}
              >
                Ricomincia
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
