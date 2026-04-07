import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, GitFork, ArrowUpDown, Code2 } from 'lucide-react';
import type { GitHubRepo } from '../services/github';

type SortField = 'stargazers_count' | 'forks_count' | 'name' | 'updated_at';
type SortOrder = 'asc' | 'desc';

interface Props {
  repos: GitHubRepo[];
  username: string;
}

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: 'stargazers_count', label: 'Estrelas' },
  { value: 'forks_count', label: 'Forks' },
  { value: 'name', label: 'Nome' },
  { value: 'updated_at', label: 'Atualizado' },
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'hoje';
  if (diffDays === 1) return 'ontem';
  if (diffDays < 30) return `${diffDays} dias atrás`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`;
  return `${Math.floor(diffDays / 365)} anos atrás`;
}

export default function RepoList({ repos, username }: Props) {
  const [sortField, setSortField] = useState<SortField>('stargazers_count');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const sorted = [...repos].sort((a, b) => {
    let cmp: number;
    if (sortField === 'name') {
      cmp = a.name.localeCompare(b.name);
    } else if (sortField === 'updated_at') {
      cmp = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
    } else {
      cmp = a[sortField] - b[sortField];
    }
    return sortOrder === 'asc' ? cmp : -cmp;
  });

  function toggleOrder() {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }

  return (
    <section className="animate-fade-in-up stagger-2">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <h3 className="fw-semibold mb-0 d-flex align-items-center gap-2" style={{ fontSize: 'var(--text-xl)' }}>
          Repositórios
          <span className="badge rounded-pill" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontSize: 'var(--text-xs)' }}>
            {repos.length}
          </span>
        </h3>
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="sort-select" className="form-label mb-0 text-muted d-none d-sm-inline" style={{ fontSize: 'var(--text-sm)' }}>
            Ordenar por
          </label>
          <select
            id="sort-select"
            className="form-select form-select-sm"
            style={{ width: 'auto' }}
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            onClick={toggleOrder}
            aria-label={sortOrder === 'asc' ? 'Ordem crescente' : 'Ordem decrescente'}
            title={sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}
          >
            <ArrowUpDown size={14} />
            {sortOrder === 'asc' ? 'ASC' : 'DESC'}
          </button>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <Code2 size={64} className="mb-3" style={{ color: 'var(--color-border)' }} />
          <p className="fw-semibold fs-5 text-body">Nenhum repositório encontrado</p>
          <p>Este usuário ainda não possui repositórios públicos.</p>
        </div>
      ) : (
        <div className="row g-3">
          {sorted.map((repo, index) => (
            <div key={repo.id} className="col-12 col-md-6 col-lg-4">
              <Link
                to={`/user/${username}/repo/${repo.name}`}
                className="card h-100 text-decoration-none card-interactive animate-fade-in-up"
                style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: 'both' }}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-semibold mb-2" style={{ color: 'var(--color-primary)' }}>{repo.name}</h5>
                  <p className="text-muted flex-grow-1 mb-3" style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {repo.description || 'Sem descrição'}
                  </p>
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex gap-2 flex-wrap">
                      <span className="badge badge-stars">
                        <Star size={12} />
                        {repo.stargazers_count.toLocaleString('pt-BR')}
                      </span>
                      <span className="badge badge-forks">
                        <GitFork size={12} />
                        {repo.forks_count.toLocaleString('pt-BR')}
                      </span>
                      {repo.language && (
                        <span className="badge badge-language">
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <small className="text-muted">{formatDate(repo.updated_at)}</small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
