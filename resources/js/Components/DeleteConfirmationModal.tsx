import React from 'react';

interface DeleteConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  if (!visible) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          width: '300px',
          textAlign: 'center',
        }}
      >
        <h5>Tem certeza que deseja excluir este cliente?</h5>
        <div className="mt-3">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            style={{ marginRight: '10px' }}
          >
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
