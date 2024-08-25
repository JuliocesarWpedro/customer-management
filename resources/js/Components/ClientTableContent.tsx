import React from 'react';
import { Edit, Trash, Eye } from 'lucide-react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Client } from '@/types/Client';

interface ClientTableContentProps {
  clients: {
    data: Client[];
  };
  onDelete: (id: number) => void;
  onOpenModal: (client: Client) => void;
}

const ClientTableContent: React.FC<ClientTableContentProps> = ({
  clients,
  onDelete,
  onOpenModal,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h2>Lista de Clientes</h2>

        {clients.data.length > 0 ? (
          <>
            <div className="table-responsive d-none d-md-block">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.data.map((client: Client) => (
                    <tr key={client.id}>
                      <td>{client.name}</td>
                      <td>{client.email}</td>
                      <td>{client.cpf}</td>
                      <td className="button-container">
                        <InertiaLink
                          href={`/client/${client.id}`}
                          className="btn btn-primary btn-icon"
                        >
                          <Eye size={16} /> Visualizar
                        </InertiaLink>
                        <button
                          onClick={() => onOpenModal(client)}
                          className="btn btn-warning btn-icon"
                        >
                          <Edit size={16} /> Editar
                        </button>
                        <button
                          onClick={() => onDelete(client.id)}
                          className="btn btn-danger btn-icon"
                        >
                          <Trash size={16} /> Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-block d-md-none">
              {clients.data.map((client: Client) => (
                <div key={client.id} className="client-card mb-3 p-3 border rounded">
                  <div>
                    <strong>Nome:</strong> {client.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {client.email}
                  </div>
                  <div>
                    <strong>CPF:</strong> {client.cpf}
                  </div>
                  <div className="button-container mt-2">
                    <InertiaLink
                      href={`/client/${client.id}`}
                      className="btn btn-primary btn-sm btn-icon"
                    >
                      <Eye size={16} /> Visualizar
                    </InertiaLink>
                    <button
                      onClick={() => onOpenModal(client)}
                      className="btn btn-warning btn-sm btn-icon mx-2"
                    >
                      <Edit size={16} /> Editar
                    </button>
                    <button
                      onClick={() => onDelete(client.id)}
                      className="btn btn-danger btn-sm btn-icon"
                    >
                      <Trash size={16} /> Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>Não existem clientes cadastrados</div>
        )}
      </div>
    </div>
  );
};

export default ClientTableContent;
