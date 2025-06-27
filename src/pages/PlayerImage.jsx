import { useState } from "react";
import { useNavigate } from "react-router-dom";
import playerImg from "../db/playerImg";

export default function PlayerImage() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const handleSelect = (image) => {
    setSelectedImg(image);
    localStorage.setItem("playerImage", image); // Salvo per usarlo nel gioco
    navigate("/playerWeapon");
  };

  return (
    <div className="player-content">
      {isMobile ? (
        <div>
          <h1 className="title-img">Scegli un'immagine</h1>
          <div className="d-flex flex-row  justify-content-center">
            <div className="row mx-0 my-0">
              {playerImg.map((img) => (
                <div
                  key={img.id}
                  className={`image-wrapper col-4 col-md-3 col-lg-4 g-2 ${
                    selectedImg === img.image ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(img.image)}
                >
                  <img
                    className="player-img"
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
          <h1 className="title-img">Scegli un'immagine</h1>
          <div className="d-flex flex-row gap-3 justify-content-center">
            {playerImg.map((img) => (
              <div
                key={img.id}
                className={`image-wrapper ${
                  selectedImg === img.image ? "selected" : ""
                }`}
                onClick={() => handleSelect(img.image)}
              >
                <img
                  className="player-img"
                  src={img.image}
                  alt={`Giocatore ${img.id}`}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
