export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  size: number
  watchers_count: number
  open_issues_count: number
}

export interface GitHubUser {
  login: string
  name: string
  bio: string | null
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  location: string | null
  email: string | null
  hireable: boolean | null
}

export interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  languages: Record<string, number>
}

export interface GitHubLanguages {
  [language: string]: number
}
