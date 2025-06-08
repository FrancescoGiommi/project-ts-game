import { Link } from "react-router-dom";
import { useEffect } from "react";
import CardPath from "./CardPath";

export default function PathModal({ options, onClose }) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden"; // blocca scroll sotto
    return () => {
      document.body.style.overflow = originalStyle; // ripristina
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="close-button btn btn-primary" onClick={onClose}>
          Chiudi
        </button>
        <div className="modal-content-scroll">
          <div className="paths-grid">
            {options.map((option) => (
              <Link to={`/floor/${option.id}`} key={option.id}>
                <CardPath path={option} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
