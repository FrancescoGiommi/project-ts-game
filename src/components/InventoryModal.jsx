export default function InventoryModal({ onClose, playerName, playerImage }) {
  return (
    <>
      <div
        className="inventory-modal-backdrop"
        onClick={() => setInventoryModal(false)}
      />
      <div className="inventory-modal">
        <div className="inventory-window-modal">
          <h1 className="text-center">Inventario</h1>
          <button className="close-button btn btn-primary" onClick={onClose}>
            Chiudi
          </button>
          <div className="d-flex flex-row align-items-center ms-4 mt-4">
            <img
              className="player-img"
              src={localStorage.getItem("playerImage")}
              alt="player"
            />
            <div className="ms-3">
              <h2>{localStorage.getItem("playerName")}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
