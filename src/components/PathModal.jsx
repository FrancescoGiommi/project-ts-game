import { Link } from "react-router-dom";

import CardPath from "./CardPath";

export default function PathModal({ options, onClose }) {
  return (
    <>
      <div className="custom-modal-overlay">
        <div className="custom-modal-dialog">
          <div className="custom-modal-scroll">
            <div className="paths-grid">
              <button
                className="close-button btn btn-primary"
                onClick={onClose}
              >
                Chiudi
              </button>
              {options.map((option) => (
                <Link
                  to={`/floor/${option.id}`}
                  key={option.id}
                  onClick={onClose}
                >
                  <CardPath path={option} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
