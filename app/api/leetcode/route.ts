import { NextResponse } from 'next/server'
import type { LeetCodeStats } from '@/types/leetcode'

export const revalidate = 21600 // 6 hours

export async function GET() {
  try {
    const username = 'saketh6704'
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode stats')
    }

    const data: LeetCodeStats = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('LeetCode API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch LeetCode stats' },
      { status: 500 }
    )
  }
}
