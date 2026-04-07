import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/user/${trimmed}`);
      setQuery('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2 flex-grow-1" role="search" style={{ maxWidth: 420 }}>
      <input
        type="text"
        className="form-control form-control-sm navbar-search-input"
        placeholder="Buscar usuário..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Nome de usuário do GitHub"
      />
      <button className="btn btn-primary btn-sm d-flex align-items-center gap-1 navbar-search-btn" type="submit" aria-label="Buscar">
        <Search size={16} />
        <span className="d-none d-md-inline">Buscar</span>
      </button>
    </form>
  );
}
