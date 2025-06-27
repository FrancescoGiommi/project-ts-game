export default function CardPath({ path }) {
  return (
    <>
      <div className="d-flex flex-column margin-card">
        <img className="img-paths mb-3" src={path.image} alt="" />
        <p className="paths-action text-center">{path.description}</p>
      </div>
    </>
  );
}
