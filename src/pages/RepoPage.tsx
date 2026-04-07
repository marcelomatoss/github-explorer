import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, GitFork, AlertCircle, Code2, ExternalLink } from 'lucide-react';
import { fetchRepo, type GitHubRepo } from '../services/github';

export default function RepoPage() {
  const { username, repoName } = useParams<{ username: string; repoName: string }>();
  const [repo, setRepo] = useState<GitHubRepo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username || !repoName) return;

    setLoading(true);
    setError('');

    fetchRepo(`${username}/${repoName}`)
      .then(setRepo)
      .catch((err) => {
        if (err.response?.status === 404) {
          setError('Repositório não encontrado.');
        } else {
          setError('Erro ao buscar dados do repositório.');
        }
      })
      .finally(() => setLoading(false));
  }, [username, repoName]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5 text-muted">
        <div className="spinner-border text-primary mb-3">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <span>Carregando repositório...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-start gap-3 animate-scale-in" role="alert">
        <AlertCircle size={20} className="flex-shrink-0 mt-1" />
        <div>
          <strong>Ops!</strong>
          <p className="mb-0">{error}</p>
        </div>
      </div>
    );
  }

  if (!repo) return null;

  return (
    <div className="mx-auto animate-fade-in-up" style={{ maxWidth: 'var(--container-narrow)' }}>
      <Link to={`/user/${username}`} className="btn btn-outline-secondary d-inline-flex align-items-center gap-2 mb-4">
        <ArrowLeft size={16} />
        Voltar para {username}
      </Link>

      <div className="card p-4 p-md-5">
        <div className="mb-3">
          <h1 className="display-6 fw-bold mb-1">{repo.name}</h1>
          <p className="text-muted font-monospace small">{repo.full_name}</p>
        </div>

        <p className="fs-5 text-muted mb-4 pb-4 border-bottom">
          {repo.description || 'Este repositório não possui descrição.'}
        </p>

        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <Star size={24} className="stat-card-icon" style={{ color: 'var(--color-badge-stars)' }} />
              <div className="stat-card-value">{repo.stargazers_count.toLocaleString('pt-BR')}</div>
              <div className="stat-card-label">Estrelas</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <GitFork size={24} className="stat-card-icon" style={{ color: 'var(--color-badge-forks)' }} />
              <div className="stat-card-value">{repo.forks_count.toLocaleString('pt-BR')}</div>
              <div className="stat-card-label">Forks</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <AlertCircle size={24} className="stat-card-icon" style={{ color: 'var(--color-badge-issues)' }} />
              <div className="stat-card-value">{repo.open_issues_count.toLocaleString('pt-BR')}</div>
              <div className="stat-card-label">Issues</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <Code2 size={24} className="stat-card-icon" style={{ color: 'var(--color-badge-language)' }} />
              <div className="stat-card-value">{repo.language || 'N/A'}</div>
              <div className="stat-card-label">Linguagem</div>
            </div>
          </div>
        </div>

        <div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark btn-lg d-inline-flex align-items-center gap-2"
          >
            <ExternalLink size={18} />
            Ver no GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
