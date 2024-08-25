import React from 'react';
import { Client, Errors, FormData } from '@/types/Client';
interface EditClientModalProps {
  visible: boolean;
  client: Client | null;
  formData: FormData;
  errors: Errors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  onOverlayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const EditClientModal: React.FC<EditClientModalProps> = ({
  visible,
  client,
  formData,
  errors,
  onChange,
  onSubmit,
  onClose,
  onOverlayClick,
}) => {
  if (!visible) return null;



  return (
    <div className="modal-overlay" onClick={onOverlayClick}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editClientModalLabel">
              Editar Cliente
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  value={formData.name}
                  onChange={onChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}
                  value={formData.cpf}
                  onChange={onChange}
                />
                <p>Digite somente números</p>
                {errors.cpf && (
                  <div className="invalid-feedback">{errors.cpf}</div>
                )}
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                  Salvar
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClientModal;
