import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <div className="text-center home-content">
        <h1>Benvenuto in Death & Rebirth!</h1>
        <p>
          Questo è un gioco narrativo in cui i personaggi incontrato una serie
          di sfide e avventure.
        </p>
        <Link to="/playerName">
          <button className="btn btn-warning">Inizia</button>
        </Link>
      </div>
    </>
  );
}
