export default function CardPath({ path }) {
  return (
    <>
      <img className="img-paths mb-3" src={path.image} alt="" />
      <button className="paths-button">{path.description}</button>
    </>
  );
}
