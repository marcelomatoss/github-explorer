import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, GitFork, Users } from 'lucide-react';
import GitHubIcon from '../components/GitHubIcon';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/user/${trimmed}`);
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      {/* Hero */}
      <section className="text-center animate-fade-in-up" style={{ maxWidth: 640, padding: 'var(--space-16) 0 var(--space-12)' }}>
        <div className="hero-icon-wrap mb-4">
          <GitHubIcon size={48} />
        </div>
        <h1 className="display-4 fw-bold mb-3" style={{ letterSpacing: '-1.5px' }}>
          Explore o <span className="hero-highlight">GitHub</span>
        </h1>
        <p className="lead text-muted mb-5">
          Descubra repositórios populares, perfis de desenvolvedores e projetos
          open source de forma rápida e elegante.
        </p>

        <form onSubmit={handleSubmit} className="d-flex gap-2 mx-auto mb-4" style={{ maxWidth: 520 }}>
          <div className="position-relative flex-grow-1">
            <Search size={20} className="position-absolute top-50 translate-middle-y text-muted" style={{ left: 16, pointerEvents: 'none' }} />
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Digite um nome de usuário do GitHub..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              aria-label="Nome de usuário do GitHub"
              style={{ paddingLeft: 48, height: 52, borderWidth: 2, borderRadius: 'var(--radius-lg)' }}
            />
          </div>
          <button className="btn btn-primary btn-lg flex-shrink-0" type="submit">
            Buscar
          </button>
        </form>

        <p className="text-muted small">
          Experimente:{' '}
          <button type="button" className="btn btn-link btn-sm p-0 text-decoration-underline" onClick={() => navigate('/user/torvalds')}>torvalds</button>,{' '}
          <button type="button" className="btn btn-link btn-sm p-0 text-decoration-underline" onClick={() => navigate('/user/gaearon')}>gaearon</button>,{' '}
          <button type="button" className="btn btn-link btn-sm p-0 text-decoration-underline" onClick={() => navigate('/user/sindresorhus')}>sindresorhus</button>
        </p>
      </section>

      {/* Features — cada card navega para um usuario exemplo */}
      <section className="row g-4 w-100 pb-5 animate-fade-in-up stagger-3" style={{ maxWidth: 800 }}>
        <div className="col-12 col-md-4">
          <button
            type="button"
            className="card h-100 text-center p-4 feature-card w-100 border-0"
            onClick={() => navigate('/user/torvalds')}
            style={{ cursor: 'pointer' }}
          >
            <div className="feature-icon mx-auto mb-3">
              <Users size={24} />
            </div>
            <h3 className="h6 fw-semibold mb-2">Perfis detalhados</h3>
            <p className="text-muted small mb-0">
              Visualize avatar, bio, seguidores, localização e muito mais.
            </p>
            <span className="text-primary small mt-2 d-block">Ver exemplo: torvalds</span>
          </button>
        </div>
        <div className="col-12 col-md-4">
          <button
            type="button"
            className="card h-100 text-center p-4 feature-card w-100 border-0"
            onClick={() => navigate('/user/sindresorhus')}
            style={{ cursor: 'pointer' }}
          >
            <div className="feature-icon mx-auto mb-3">
              <Star size={24} />
            </div>
            <h3 className="h6 fw-semibold mb-2">Repos populares</h3>
            <p className="text-muted small mb-0">
              Repositórios ordenados por estrelas com opções de ordenação.
            </p>
            <span className="text-primary small mt-2 d-block">Ver exemplo: sindresorhus</span>
          </button>
        </div>
        <div className="col-12 col-md-4">
          <button
            type="button"
            className="card h-100 text-center p-4 feature-card w-100 border-0"
            onClick={() => navigate('/user/facebook')}
            style={{ cursor: 'pointer' }}
          >
            <div className="feature-icon mx-auto mb-3">
              <GitFork size={24} />
            </div>
            <h3 className="h6 fw-semibold mb-2">Detalhes completos</h3>
            <p className="text-muted small mb-0">
              Explore cada repositório com estatísticas e link direto ao GitHub.
            </p>
            <span className="text-primary small mt-2 d-block">Ver exemplo: facebook</span>
          </button>
        </div>
      </section>
    </div>
  );
}
