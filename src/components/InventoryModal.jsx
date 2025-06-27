export default function InventoryModal({ onClose, playerName, playerImage }) {
  const equipmentSlots = Array(12).fill(null);
  const itemSlots = Array(12).fill(null);
  const savedWeapon = JSON.parse(localStorage.getItem("playerWeapon"));
  if (savedWeapon) {
    equipmentSlots[0] = savedWeapon;
  }
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
          <div className="d-flex flex-row align-items-center ms-4 mt-5">
            <img
              className="player-img"
              src={localStorage.getItem("playerImage")}
              alt="player"
            />
            <div className="ms-3">
              <h2>{localStorage.getItem("playerName")}</h2>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-around align-items-center">
            <div className="d-flex flex-column justify-content-around mt-5">
              <h3>Equipaggiamento</h3>
              <div className="equipment-container">
                {equipmentSlots.map((slot, index) => (
                  <div key={index} className="inventory-slot">
                    {/* slot vuoto, in futuro potrai mostrare un'arma qui */}
                    {slot || (index === 0 && savedWeapon) ? (
                      <img
                        src={slot?.image || savedWeapon?.image}
                        alt={slot?.name || savedWeapon?.name}
                        className="slot-image"
                      />
                    ) : (
                      <span className="empty-slot-text">Vuoto</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <h3>Oggetti</h3>
              <div className="items-container">
                {itemSlots.map((slot, index) => (
                  <div key={index} className="inventory-slot">
                    {slot ? (
                      <img
                        src={slot.image}
                        alt={slot.name}
                        className="slot-image"
                      />
                    ) : (
                      <span className="empty-slot-text">Vuoto</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
