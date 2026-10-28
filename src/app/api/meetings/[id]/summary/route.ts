import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateMeetingSummary } from '@/lib/anthropic'

export async function POST(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { template } = await req.json()

    const meeting = await prisma.meeting.findFirst({
      where: { id: params.id, userId: session.user.id },
      include: { transcript: { orderBy: { order: 'asc' } } },
    })

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 })
    }

    // Build transcript text
    const transcriptText = meeting.transcript
      .map((seg) => `${seg.speaker}: ${seg.text}`)
      .join('\n')

    if (!transcriptText) {
      return NextResponse.json({ error: 'No transcript available' }, { status: 400 })
    }

    const summaryData = await generateMeetingSummary(transcriptText, template || 'general')

    // Upsert summary
    const summary = await prisma.meetingSummary.upsert({
      where: { meetingId: params.id },
      create: {
        meetingId: params.id,
        template: template || 'general',
        overview: summaryData.overview,
        keyPoints: summaryData.keyPoints,
        decisions: summaryData.decisions,
        nextSteps: summaryData.nextSteps,
        rawContent: JSON.stringify(summaryData),
      },
      update: {
        template: template || 'general',
        overview: summaryData.overview,
        keyPoints: summaryData.keyPoints,
        decisions: summaryData.decisions,
        nextSteps: summaryData.nextSteps,
        rawContent: JSON.stringify(summaryData),
      },
    })

    return NextResponse.json(summary)
  } catch (error) {
    console.error('Summary generation error:', error)
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 })
  }
}
