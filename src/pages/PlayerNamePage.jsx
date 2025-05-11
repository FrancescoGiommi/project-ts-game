import { useRef } from "react";

export default function PlayerNamePage() {
  const playerNameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const playerName = playerNameRef.current.value.trim();
    if (playerName) {
      localStorage.setItem("playerName", playerName);
    }
  };
  return (
    <>
      <div className="container text-center home-content">
        <h1>Inserisci il nome del tuo personaggio</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control w-100 mb-3"
            ref={playerNameRef}
            placeholder="Nome del Personaggio"
          />
          <button className="btn btn-warning">Inizia</button>
        </form>
      </div>
    </>
  );
}
