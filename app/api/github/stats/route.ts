import { NextResponse } from 'next/server'
import { fetchGitHubRepos, calculateGitHubStats } from '@/lib/github'
import { GITHUB_USERNAME } from '@/lib/constants'

export async function GET() {
  try {
    const repos = await fetchGitHubRepos(GITHUB_USERNAME)
    const stats = calculateGitHubStats(repos)
    return NextResponse.json(stats)
  } catch (error) {
    console.error('GitHub API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    )
  }
}
