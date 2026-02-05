import { NextResponse } from 'next/server'

export const revalidate = 3600 // 1 hour

interface ContributionDay {
  date: string
  count: number
  level: number
}

export async function GET() {
  try {
    const username = 'nsk6704'

    // Fetch from github-contributions-api (better than Events API)
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub contributions')
    }

    const data = await response.json()

    // Transform data to match our component's expected format
    // The API returns { contributions: [ { date, count, level } ] } which matches our need mostly
    // We just need to ensure the structure aligns

    const contributions: ContributionDay[] = data.contributions.map((day: any) => ({
      date: day.date,
      count: day.count,
      level: day.level
    }))

    // Calculate streaks and totals from this accurate data
    const totalContributions = data.total[Object.keys(data.total)[0]] || contributions.reduce((acc, day) => acc + day.count, 0)

    // Calculate current streak
    // The array is usually sorted by date, but let's be safe
    const sortedDays = [...contributions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    let currentStreak = 0
    const today = new Date().toISOString().split('T')[0]

    // Check if the most recent entry is today or yesterday (to allow for timezone diffs)
    // If the latest entry is older than yesterday, streak might be broken, but let's just count backwards from the last available day
    // Actually, to be accurate, we should check if the latest day is "connected" to today.

    // Simple streak calculation: count backwards from latest entry that has contributions
    let streakActive = true
    for (const day of sortedDays) {
      if (day.count > 0) {
        currentStreak++
        streakActive = true
      } else {
        // If we hit a zero, streak ends regarding of whether it was active
        // Exception: if the zero is TODAY (and we haven't committed yet), the streak from yesterday is still valid.
        // But if we encounter a zero in the past, it breaks.

        // Simplification: Standard GitHub streak logic is contiguous days with > 0.
        // If we hit a 0, we stop. Use the API's date to check if it's "today" relative to user? 
        // Let's just trust the sequence.
        if (day.date === today && day.count === 0) {
          continue // Skip today if no commits yet, don't break streak from yesterday
        }
        break
      }
    }

    return NextResponse.json({
      contributions,
      currentStreak, // This helps, but the API doesn't give streak directly, so this is an approximation
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
