export default function CardPath({ path }) {
  return (
    <>
      <div className="d-flex flex-column ">
        <img className="img-paths mb-3" src={path.image} alt="" />
        <button className="paths-button">{path.description}</button>
      </div>
    </>
  );
}
