import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import {  ClientTableProps } from '@/types/Client';
import SearchBar from './SearchBar';
import ClientTableContent from './ClientTableContent';
import Pagination from './Pagination';

const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  onDelete,
  onOpenModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPagesToShow, setMaxPagesToShow] = useState(4);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    const savedPage = parseInt(localStorage.getItem('currentPage') || '1', 10);

    setSearchTerm(savedSearchTerm);
    setCurrentPage(savedPage);
  }, []);

  const updateLocalStorage = () => {
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('currentPage', currentPage.toString());
  };


   const fetchClients = (page: number, search: string) => {
    Inertia.get('/clients', { page, search }, { preserveState: true });
    setCurrentPage(page);
    updateLocalStorage(); 
  };

  const handleSearch = () => {
    if(searchTerm) {
      fetchClients(1, searchTerm); 
    } else {

    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchClients(1, ''); 
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 350) {
        setMaxPagesToShow(1);
      } else if (window.innerWidth < 400) {
        setMaxPagesToShow(2);
      } else if (window.innerWidth < 576) {
        setMaxPagesToShow(4);
      } else if (window.innerWidth < 768) {
        setMaxPagesToShow(6);
      } else if (window.innerWidth < 992) {
        setMaxPagesToShow(7);
      } else {
        setMaxPagesToShow(8);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const search = params.get('search') || '';
      const page = parseInt(params.get('page') || '1', 10);

      setSearchTerm(search);
      setCurrentPage(page);
    };

    updateFromUrl();
    window.addEventListener('popstate', updateFromUrl);

    return () => window.removeEventListener('popstate', updateFromUrl);
  }, []);

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(clients.last_page || 1, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

   const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
     <div>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        onSearchTermChange={handleSearchTermChange}
      />
      <ClientTableContent
        clients={clients}
        onDelete={onDelete}
        onOpenModal={onOpenModal}
      />
      <Pagination clients={clients} searchTerm={searchTerm} />
    </div>
  );
};

export default ClientTable;
