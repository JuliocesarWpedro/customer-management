import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
  clients: any;
  searchTerm: string;
}

const Pagination: React.FC<PaginationProps> = ({ clients, searchTerm }) => {
  const maxPagesToShow = 8; 

  let startPage = Math.max(1, clients.current_page - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(clients.last_page || 1, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return (
    <nav>
      <ul className="pagination">
        {clients.prev_page_url ? (
          <li className="page-item">
            <InertiaLink
              href={`${clients.prev_page_url}&search=${searchTerm}`}
              className="page-link"
            >
              <ArrowLeft size={16} />
            </InertiaLink>
          </li>
        ) : (
          <li className="page-item disabled">
            <span className="page-link">
              <ArrowLeft size={16} />
            </span>
          </li>
        )}

        {startPage > 1 && (
          <li className="page-item">
            <InertiaLink
              href={`/clients?page=1&search=${searchTerm}`}
              className="page-link"
            >
              1
            </InertiaLink>
          </li>
        )}

        {startPage > 2 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <li
            key={page}
            className={`page-item ${clients.current_page === page ? 'active' : ''}`}
          >
            <InertiaLink
              href={`/clients?page=${page}&search=${searchTerm}`}
              className="page-link"
            >
              {page}
            </InertiaLink>
          </li>
        ))}

        {endPage < clients.last_page && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}

        {endPage < clients.last_page && (
          <li className="page-item">
            <InertiaLink
              href={`/clients?page=${clients.last_page}&search=${searchTerm}`}
              className="page-link"
            >
              {clients.last_page}
            </InertiaLink>
          </li>
        )}

        {clients.next_page_url ? (
          <li className="page-item">
            <InertiaLink
              href={`${clients.next_page_url}&search=${searchTerm}`}
              className="page-link"
            >
              <ArrowRight size={16} />
            </InertiaLink>
          </li>
        ) : (
          <li className="page-item disabled">
            <span className="page-link">
              <ArrowRight size={16} />
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
