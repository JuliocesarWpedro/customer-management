export interface Client {
  id: number;
  name: string;
  email: string;
  cpf: string;
}

export interface FormData {
  id: number;
  name: string;
  email: string;
  cpf: string;
}

export interface Errors {
  name?: string;
  email?: string;
  cpf?: string;
}

export interface ManageClientsProps {
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
}

export interface ClientTableProps {
  clients: ManageClientsProps;
  onDelete: (id: number) => void;
  onOpenModal: (client: Client) => void;
}


export interface ClientDetailProps {
  client: Client;
  clients: Client[];
}
