import React from 'react';
import { X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: () => void;
  onClearSearch: () => void;
  onSearchTermChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearch,
  onClearSearch,
  onSearchTermChange
}) => (
  <div className="mb-3">
    <p>Pesquise por um nome</p>
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Pesquisar por nome"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />
      <button
        className="btn btn-primary"
        onClick={onSearch}
      >
        Buscar
      </button>
      {searchTerm && (
        <button
          className="btn btn-secondary"
          onClick={onClearSearch}
        >
          <X size={16} />
        </button>
      )}
    </div>
  </div>
);

export default SearchBar;
