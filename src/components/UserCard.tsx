import { Users, UserPlus, BookOpen, Mail, MapPin, Building2, Globe, ExternalLink } from 'lucide-react';
import type { GitHubUser } from '../services/github';

interface Props {
  user: GitHubUser;
}

export default function UserCard({ user }: Props) {
  return (
    <div className="card mb-4 animate-fade-in-up">
      <div className="card-body">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-auto text-center">
            <div className="user-card-avatar-wrap">
              <img
                src={user.avatar_url}
                alt={`Avatar de ${user.login}`}
                className="rounded-circle border border-2"
                width={120}
                height={120}
                style={{ objectFit: 'cover' }}
              />
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="user-card-github-link"
                aria-label="Ver perfil no GitHub"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
          <div className="col">
            <h2 className="fw-bold mb-1">{user.name || user.login}</h2>
            {user.name && (
              <p className="text-muted mb-2" style={{ fontSize: 'var(--text-sm)' }}>@{user.login}</p>
            )}
            {user.bio && (
              <p className="text-muted mb-3" style={{ lineHeight: 'var(--leading-relaxed)' }}>{user.bio}</p>
            )}

            <div className="d-flex flex-wrap gap-4">
              <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: 'var(--text-sm)' }}>
                <Users size={16} style={{ color: 'var(--color-primary)' }} />
                <strong className="text-body">{user.followers.toLocaleString('pt-BR')}</strong>
                <span>seguidores</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: 'var(--text-sm)' }}>
                <UserPlus size={16} style={{ color: 'var(--color-primary)' }} />
                <strong className="text-body">{user.following.toLocaleString('pt-BR')}</strong>
                <span>seguindo</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: 'var(--text-sm)' }}>
                <BookOpen size={16} style={{ color: 'var(--color-primary)' }} />
                <strong className="text-body">{user.public_repos.toLocaleString('pt-BR')}</strong>
                <span>repos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(user.email || user.location || user.company || user.blog) && (
        <div className="card-footer d-flex flex-wrap gap-3" style={{ background: 'var(--color-muted)' }}>
          {user.email && (
            <a href={`mailto:${user.email}`} className="d-flex align-items-center gap-2 text-muted text-decoration-none" style={{ fontSize: 'var(--text-sm)' }}>
              <Mail size={15} />
              <span>{user.email}</span>
            </a>
          )}
          {user.location && (
            <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: 'var(--text-sm)' }}>
              <MapPin size={15} />
              <span>{user.location}</span>
            </div>
          )}
          {user.company && (
            <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: 'var(--text-sm)' }}>
              <Building2 size={15} />
              <span>{user.company}</span>
            </div>
          )}
          {user.blog && (
            <a
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-2 text-muted text-decoration-none"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <Globe size={15} />
              <span>{user.blog}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
