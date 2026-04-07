import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { fetchUser, fetchUserRepos, type GitHubUser, type GitHubRepo } from '../services/github';
import UserCard from '../components/UserCard';
import RepoList from '../components/RepoList';

export default function UserPage() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    setError('');
    setUser(null);
    setRepos([]);

    Promise.all([fetchUser(username), fetchUserRepos(username)])
      .then(([userData, reposData]) => {
        setUser(userData);
        setRepos(reposData);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError(`Usuário "${username}" não encontrado.`);
        } else if (err.response?.status === 403) {
          setError('Limite de requisições atingido. Tente novamente em alguns minutos.');
        } else {
          setError('Erro ao buscar dados. Verifique sua conexão e tente novamente.');
        }
      })
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5 text-muted" role="status">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <span>Buscando perfil...</span>
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

  if (!user || !username) return null;

  return (
    <div>
      <UserCard user={user} />
      <RepoList repos={repos} username={username} />
    </div>
  );
}
