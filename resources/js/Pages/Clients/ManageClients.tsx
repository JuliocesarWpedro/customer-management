import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Client, Errors, FormData } from '@/types/Client';
import ClientForm from '@/Components/ClientForm';
import ClientTable from '@/Components/ClientTable';
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal';
import { formatCPF } from '@/utils/formatCpf';

interface ManageClientsProps {
  clients: {
    current_page: number;
    data: Client[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export default function ManageClients({ clients }: ManageClientsProps) {
  const { data, setData, reset, post, put } = useForm<FormData>({
    id: Number(''),
    name: '',
    email: '',
    cpf: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [previousClient, setPreviousClient] = useState<Client | null>(null);


  React.useEffect(() => {
    const newErrors: Errors = { ...errors };

    if (data.name) {
      newErrors.name = '';
    }
    if (data.email) {
      newErrors.email = '';
    }
    if (data.cpf) {
      const cpf = data.cpf.replace(/\D+/g, '');

      const cpfExists = clients.data.some(
        (client) =>
          client.cpf.replace(/\D+/g, '') === cpf && client.id !== data.id
      );
      if (!cpfExists) newErrors.cpf = '';
    }

    setErrors(newErrors);
  }, [data]);

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

      setData({ ...data, cpf: formattedValue });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const hasChanges = (current: FormData, previous: Client | null) => {
    if (!previous) return true;

    return Object.keys(current).some((key) => {
      const typedKey = key as keyof FormData; 
      return current[typedKey] !== previous[typedKey];
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!data.name) newErrors.name = 'Nome é obrigatório.';
    if (!data.email) newErrors.email = 'Email é obrigatório.';
    if (!data.cpf) newErrors.cpf = 'CPF é obrigatório.';
    else {
      const cpf = data.cpf.replace(/\D+/g, '');
      if (cpf.length !== 11) newErrors.cpf = 'CPF deve ter 11 dígitos.';
      else if (!formatCPF(cpf)) newErrors.cpf = 'CPF inválido.';
      else {

        const cpfExists = clients.data.some(
          (client) =>
            client.cpf.replace(/\D+/g, '') === cpf && client.id !== data.id
        );
        if (cpfExists) newErrors.cpf = 'CPF já cadastrado.';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (data.id) {
      if (hasChanges(data, previousClient)) {
        put(route('clients.update', data.id));
      } else {
        setData({ id: Number(''), name: '', email: '', cpf: '' });
      }
    } else {
      post(route('clients.store'));
    }

    reset();
    setPreviousClient(data);
  };

  const handleDelete = (id: number) => {
    setSelectedClient(clients.data.find((client) => client.id === id) || null);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedClient) {
      Inertia.delete(route('clients.destroy', selectedClient.id));
    }
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setData({ id: Number(''), name: '', email: '', cpf: '' });
    setErrors({});
    setPreviousClient(null);
    setIsModalVisible(false);
  };

const handleOpenModal = (client: Client) => {
  setData({
    id: client.id,
    name: client.name,
    email: client.email,
    cpf: client.cpf,

  });

  setPreviousClient(client);
  setIsModalVisible(true);

    window.scrollTo({ top: 0, behavior: 'smooth' });


};

  return (
    <>
      <Head title="Gerenciamento de Clientes" />
      <div className="container my-5">
        <h1 className="mb-4">Gerenciamento de Clientes</h1>


          <ClientForm
            data={data}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
              handleCancel={handleCancel} 
          />


        {clients && (
          <ClientTable
            onOpenModal={handleOpenModal}
            clients={clients}
            onDelete={handleDelete}
          />
        )}

        <DeleteConfirmationModal
          visible={isDeleteModalVisible}
          onClose={() => setIsDeleteModalVisible(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </>
  );
}
