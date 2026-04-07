import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import GitHubIcon from './components/GitHubIcon';
import { useTheme } from './hooks/useTheme';
import SearchBar from './components/SearchBar';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import RepoPage from './pages/RepoPage';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <div className="app-layout">
        <nav className="navbar navbar-dark bg-dark sticky-top">
          <div className="container d-flex align-items-center justify-content-between gap-3">
            <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold">
              <GitHubIcon size={28} className="navbar-brand-icon" />
              <span className="d-none d-md-inline">GitHub Explorer</span>
            </Link>

            <SearchBar />

            <div className="d-flex align-items-center">
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
                title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </div>
        </nav>

        <main className="container py-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:username" element={<UserPage />} />
            <Route path="/user/:username/repo/:repoName" element={<RepoPage />} />
          </Routes>
        </main>

        <footer className="app-footer">
          GitHub Explorer &mdash; Desafio Front-End Desbravador Software
        </footer>
      </div>
    </BrowserRouter>
  );
}
