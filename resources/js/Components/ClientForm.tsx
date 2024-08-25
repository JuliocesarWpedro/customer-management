import { Errors, FormData } from '@/types/Client';
import React, { ChangeEvent, FormEvent } from 'react';

interface ClientFormProps {
  data: FormData;
  errors: Errors;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleCancel : () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({
  data,
  handleCancel,
  errors,
  onChange,
  onSubmit,
}) => {
  return (
    <div className="card mb-4" id='form'>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label htmlFor="name" className="form-label">
                Nome
              </label>
              <span
                className="invalid-feedback"
                style={{ display: 'block', marginTop: '0' }}
              >
                *
              </span>
            </div>
            <input
              id="name"
              name="name"
              placeholder="Digite seu nome"
              type="text"
              value={data.name}
              onChange={onChange}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="mb-3">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <span
                className="invalid-feedback"
                style={{ display: 'block', marginTop: '0' }}
              >
                *
              </span>
            </div>

            <input
              id="email"
              placeholder="seunome@gmail.com"
              name="email"
              type="email"
              value={data.email}
              onChange={onChange}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label htmlFor="cpf" className="form-label">
                CPF
              </label>
              <span
                className="invalid-feedback"
                style={{ display: 'block', marginTop: '0' }}
              >
                *
              </span>
            </div>
            <input
              id="cpf"
              placeholder="xxx.xxx.xxx-xx"
              name="cpf"
              type="text"
              value={data.cpf}
              onChange={onChange}
              className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}
            />
            <p>Digite somente números</p>
            {errors.cpf && <div className="invalid-feedback">{errors.cpf}</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            {data.id ? 'Atualizar Cliente' : 'Adicionar Cliente'}
          </button>
           {data.id ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel} 
              >
                Não Quero Mais Editar
              </button>
            ) : ''}
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
