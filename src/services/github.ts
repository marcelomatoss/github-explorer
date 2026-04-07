import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  email: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
  location: string | null;
  blog: string | null;
  company: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
  open_issues_count: number;
}

export async function fetchUser(username: string): Promise<GitHubUser> {
  const { data } = await api.get<GitHubUser>(`/users/${encodeURIComponent(username)}`);
  return data;
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const { data } = await api.get<GitHubRepo[]>(
    `/users/${encodeURIComponent(username)}/repos`,
    { params: { per_page: 100 } }
  );
  return data;
}

export async function fetchRepo(fullName: string): Promise<GitHubRepo> {
  const { data } = await api.get<GitHubRepo>(`/repos/${fullName}`);
  return data;
}
