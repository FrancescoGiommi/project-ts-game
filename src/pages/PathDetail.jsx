import { useParams, Link } from "react-router-dom";
import { gameData } from "../db/gameData";
import CardPath from "../components/CardPath";

export default function PathDetail({ path }) {
  const { id } = useParams();

  const { weapons, enemies, floors, paths } = gameData;

  const playerName = localStorage.getItem("playerName");

  const pathData = paths.find((path) => path.id === id);

  if (!pathData) {
    return <h1>Percorso non trovato</h1>;
  }

  return (
    <>
      <div className="main-img">
        <div className="container">
          <h1 className="pt-5">Primo piano</h1>

          <div>
            <div className="d-flex flex-column align-items-center justify-content-center text-center">
              <h3 className="fs-1 subtitle">{pathData.title}</h3>

              {/* Descrizione */}
              <img
                className="img-paths main-image"
                src={pathData.imagePath1}
                alt=""
              />
              <p className="description">
                {playerName} {pathData.narration}
              </p>
            </div>

            <div className="d-flex flex-row justify-content-around paths">
              <div className="d-flex flex-row">
                {pathData.options.map((path, index) => (
                  <Link to={`/floor/${path.next}`} key={index}>
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
          </div>
        </div>
      </div>
    </>
  );
}
