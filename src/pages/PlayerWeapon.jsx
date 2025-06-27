import { useState } from "react";
import { useNavigate } from "react-router-dom";
import weapons from "../db/weapons";

export default function PlayerWeapon() {
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const handleSelect = (weapon) => {
    setSelectedWeapon(weapon);
    localStorage.setItem("playerWeapon", weapon); // Salvo per usarlo nel gioco
    navigate("/floor");
  };
  return (
    <>
      <div className="player-content">
        {isMobile ? (
          <div>
            <h1 className="title-img">Scegli un'arma</h1>
            <div className="d-flex flex-row  justify-content-center">
              <div className="row mx-0 my-0">
                {weapons.map((img) => (
                  <div
                    key={img.id}
                    className={`image-wrapper col-4 col-md-3 col-lg-4 g-2 ${
                      selectedWeapon === img.image ? "selected" : ""
                    }`}
                    onClick={() => handleSelect(img.image)}
                  >
                    <img
                      className="weapon-img"
                      src={img.image}
                      alt={`Giocatore ${img.id}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="title-img">Scegli un'arma</h1>
            <div className="d-flex flex-row gap-3 justify-content-center">
              {weapons.map((img) => (
                <div
                  key={img.id}
                  className={`image-wrapper ${
                    selectedWeapon === img.image ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(img.image)}
                >
                  <img
                    className="weapon-img"
                    src={img.image}
                    alt={`Giocatore ${img.id}`}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
