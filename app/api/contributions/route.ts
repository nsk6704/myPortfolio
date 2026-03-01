import { NextResponse } from 'next/server'

export const revalidate = 3600 // 1 hour

interface ContributionDay {
  date: string
  count: number
  level: number
}

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql'

function getContributionLevel(count: number): number {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 4) return 2
  if (count <= 6) return 3
  return 4
}

export async function GET() {
  try {
    const username = 'nsk6704'
    const token = process.env.GITHUB_TOKEN

    if (!token) {
      throw new Error('GITHUB_TOKEN not configured')
    }

    // GraphQL query to fetch contributions for the last year
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
    })

    if (!response.ok) {
      throw new Error(`GitHub GraphQL API error: ${response.statusText}`)
    }

    const { data, errors } = await response.json()

    if (errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`)
    }

    const calendar = data.user.contributionsCollection.contributionCalendar
    
    // Flatten weeks into a single array of days
    const contributions: ContributionDay[] = calendar.weeks
      .flatMap((week: any) => week.contributionDays)
      .map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
        level: getContributionLevel(day.contributionCount)
      }))

    const totalContributions = calendar.totalContributions

    // Calculate current streak
    const sortedDays = [...contributions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    let currentStreak = 0
    const today = new Date().toISOString().split('T')[0]

    for (const day of sortedDays) {
      if (day.count > 0) {
        currentStreak++
      } else {
        // Allow today to have 0 contributions without breaking streak
        if (day.date === today) {
          continue
        }
        break
      }
    }

    return NextResponse.json({
      contributions,
      currentStreak,
      totalContributions,
      username,
    })
  } catch (error) {
    console.error('Contributions API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contribution data' },
      { status: 500 }
    )
  }
}
