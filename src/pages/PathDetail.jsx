import { useParams } from "react-router-dom";
import { gameData } from "../db/gameData";

export default function PathDetail({ path }) {
  const { id } = useParams();

  const { weapons, enemies, floors } = gameData;

  return (
    <>
      <h1>Titolo</h1>
    </>
  );
}
