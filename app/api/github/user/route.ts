import { NextResponse } from 'next/server'
import { fetchGitHubUser } from '@/lib/github'
import { GITHUB_USERNAME } from '@/lib/constants'

export async function GET() {
  try {
    const data = await fetchGitHubUser(GITHUB_USERNAME)
    return NextResponse.json(data)
  } catch (error) {
    console.error('GitHub API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub user' },
      { status: 500 }
    )
  }
}
