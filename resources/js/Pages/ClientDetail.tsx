import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { ClientDetailProps, Errors } from '@/types/Client';
import EditClientModal from '@/Components/EditClientModal';
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal';
import { formatCPF } from '@/utils/formatCpf';

export default function ClientDetail({ client, clients }: ClientDetailProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: client.name,
    email: client.email,
    cpf: client.cpf,
    id: client.id,
  });

  const [errors, setErrors] = useState<Errors>({});

  React.useEffect(() => {
    const newErrors = { ...errors };

    if (formData.name) {
      newErrors.name = '';
    }
    if (formData.email) {
      newErrors.email = '';
    }
    if (formData.cpf) {
      const cpf = formData.cpf.replace(/\D+/g, '');
      const cpfExists = clients.some(
        (client) =>
          client.cpf.replace(/\D+/g, '') === cpf && client.id !== formData.id
      );
      if (!cpfExists) newErrors.cpf = '';
    }

    setErrors(newErrors);
  }, [formData]);

  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cpf') {
      let cleanedValue = value.replace(/\D+/g, '').substring(0, 11);

      let formattedValue = cleanedValue
        .replace(/(\d{3})(\d{1,3})/, '$1.$2')
        .replace(/(\d{3})(\d{1,3})/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      if (formattedValue.length > 14) {
        formattedValue = formattedValue.substring(0, 14);
      }
      setFormData({ ...formData, cpf: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (
      formData.name === client.name &&
      formData.email === client.email &&
      formData.cpf === client.cpf
    ) {
      handleModalClose();
      return;
    }

    if (!formData.name) newErrors.name = 'Nome é obrigatório.';
    if (!formData.email) newErrors.email = 'Email é obrigatório.';
    if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório.';
    else {
      const cpf = formData.cpf.replace(/\D+/g, '');
      if (cpf.length !== 11) newErrors.cpf = 'CPF deve ter 11 dígitos.';
      else if (!formatCPF(cpf)) newErrors.cpf = 'CPF inválido.';
      else {

        const cpfExists = clients.some(
          (client) =>
            client.cpf.replace(/\D+/g, '') === cpf && client.id !== formData.id
        );
        if (cpfExists) {
          newErrors.cpf = 'CPF já cadastrado.';
        }
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    Inertia.put(`/clients/${formData.id}`, formData, {
      onSuccess: () => {
        handleModalClose(); 
      },
      onError: (error) => {
        console.error('Inertia request failed:', error);
      },
    });
  };

  const handleEdit = () => {
    setErrors({});
    setModalVisible(true);
  };

  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    Inertia.delete(`/clients/${client.id}`, {
      onSuccess: () => {
        setDeleteModalVisible(false);
        setFormData({
          name: '',
          email: '',
          cpf: '',
          id: 0,
        });
      },
      onError: (error) => {
        console.error('Inertia request failed:', error);
      },
    });
  };

  const handleModalClose = () => {
    setFormData({
      name: client.name,
      email: client.email,
      cpf: client.cpf,
      id: client.id,
    });
    setModalVisible(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">{client.name}</h2>
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3 text-center">
              <strong>Email:</strong> {client.email}
            </div>
            <div className="mb-3 text-center">
              <strong>CPF:</strong> {client.cpf}
            </div>
          </div>
          <div className="d-flex justify-content-center gap-2 mt-4">
            <button className="btn btn-warning" onClick={handleEdit}>
              Editar
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Excluir
            </button>
            <Link href="/" className="btn btn-secondary">
              Voltar
            </Link>
          </div>
        </div>
      </div>

      <EditClientModal
        visible={modalVisible}
        client={client}
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={handleModalClose}
        onOverlayClick={handleOverlayClick}
      />

      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
