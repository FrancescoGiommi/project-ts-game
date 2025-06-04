export default function BattleModal({ onClose, onBattle }) {
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
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">Lancia il dado e sfida il nemico!</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Chiudi
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onBattle}
            >
              Combatti!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
