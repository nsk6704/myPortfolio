import { GitHubRepo, GitHubStats, GitHubUser } from '@/types/github'

const GITHUB_API_BASE = 'https://api.github.com'

const getHeaders = () => ({
  'Accept': 'application/vnd.github.v3+json',
  ...(process.env.GITHUB_TOKEN && {
    'Authorization': `token ${process.env.GITHUB_TOKEN}`
  })
})

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const res = await fetch(`${GITHUB_API_BASE}/users/${username}`, { 
    headers: getHeaders(),
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.statusText}`)
  }
  
  return res.json()
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`,
    { 
      headers: getHeaders(),
      next: { revalidate: 3600 } 
    }
  )
  
  if (!res.ok) {
    throw new Error(`Failed to fetch repos: ${res.statusText}`)
  }
  
  return res.json()
}

export async function fetchRepoLanguages(owner: string, repo: string): Promise<Record<string, number>> {
  const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`, {
    headers: getHeaders(),
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) {
    throw new Error(`Failed to fetch languages: ${res.statusText}`)
  }
  
  return res.json()
}

export function calculateGitHubStats(repos: GitHubRepo[]): GitHubStats {
  const stats: GitHubStats = {
    totalRepos: repos.length,
    totalStars: repos.reduce((acc, repo) => acc + repo.stargazers_count, 0),
    totalForks: repos.reduce((acc, repo) => acc + repo.forks_count, 0),
    languages: {}
  }

  repos.forEach(repo => {
    if (repo.language) {
      stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1
    }
  })

  return stats
}

export function getTopLanguages(languages: Record<string, number>, limit: number = 5): [string, number][] {
  return Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
}
