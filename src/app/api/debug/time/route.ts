import { NextResponse } from 'next/server'

export async function GET() {
  const serverTime = new Date()
  const serverTimestamp = serverTime.toISOString()
  const serverUnix = Math.floor(serverTime.getTime() / 1000)

  // Get AWS time for comparison (make a simple request)
  let awsTime = null
  try {
    const response = await fetch('https://sts.amazonaws.com', {
      method: 'GET',
    })
    awsTime = response.headers.get('date')
  } catch (error) {
    console.error('Failed to fetch AWS time:', error)
  }

  return NextResponse.json({
    serverTime: serverTimestamp,
    serverUnix,
    awsTime,
    timeDifference: awsTime
      ? Math.abs(serverTime.getTime() - new Date(awsTime).getTime()) / 1000
      : null,
    isWithinThreshold: awsTime
      ? Math.abs(serverTime.getTime() - new Date(awsTime).getTime()) / 1000 < 900 // 15 minutes
      : null,
  })
}
