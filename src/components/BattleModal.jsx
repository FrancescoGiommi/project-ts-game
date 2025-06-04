export default function BattleModal({
  result,
  battle,
  playerDice,
  enemyDice,
  playerHealth,
  enemyHealth,
}) {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
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
                      style={{ width: `${(playerHealth / 5) * 100}%` }}
                    ></div>
                  </div>

                  {/* Immagine player */}
                  <img
                    className="player-img mb-3"
                    src="/img/player_img.jpg"
                    alt="player image"
                  />

                  {playerDice !== null && <p className="fs-1">{playerDice}</p>}
                </div>
                <div className="d-flex flex-column align-items-center">
                  {/* Barra salute del nemico */}
                  <div className="health-bar-container">
                    <div
                      className="health-bar"
                      style={{ width: `${(enemyHealth / 5) * 100}%` }}
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

              <button
                type="button"
                className="btn btn-primary w-50 mx-auto"
                onClick={battle}
              >
                ⚔️ Lancia il dado
              </button>
            </div>
            {result && (
              <div className="mt-4">
                <h2 className="text-center">Risultato della battaglia:</h2>
                <p className="text-center fs-3">{result}</p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Chiudi
            </button>
            <button type="button" className="btn btn-primary">
              Combatti!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
