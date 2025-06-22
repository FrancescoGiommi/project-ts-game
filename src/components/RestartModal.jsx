import { useNavigate } from "react-router-dom";

export default function RestartModal({ onClose }) {
  const navigate = useNavigate();

  const handleRestart = () => {
    // Vai alla home
    navigate("/floor");
    onClose;
  };

  return (
    <>
      <div className="modal-backdrop show" />
      {/* Modale visibile */}
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center text-danger">
                Sei Morto!
              </h5>
            </div>
            <div className="modal-body">
              <p className="fs-3">Ricomincia da capo.</p>
              <p className="fs-5">
                Ricominciando perdi tutti i progressi e gli oggetti raccolti, ad
                eccezione dell'arma.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary d-flex justdy-content-center alignn-items-center"
                onClick={handleRestart}
              >
                Ricomincia
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
