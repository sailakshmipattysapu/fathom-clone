import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { SEED_MEETINGS } from '@/lib/seed-data'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Delete existing meetings for this user
    await prisma.meeting.deleteMany({
      where: { userId: session.user.id },
    })

    const createdMeetings = []

    for (const meetingData of SEED_MEETINGS) {
      const meeting = await prisma.meeting.create({
        data: {
          title: meetingData.title,
          date: meetingData.date,
          duration: meetingData.duration,
          platform: meetingData.platform,
          attendees: meetingData.attendees,
          userId: session.user.id,
          transcript: {
            create: meetingData.transcript.map((seg) => ({
              speaker: seg.speaker,
              text: seg.text,
              startTime: seg.startTime,
              endTime: seg.endTime,
              order: seg.order,
            })),
          },
          summary: {
            create: {
              template: meetingData.summary.template,
              overview: meetingData.summary.overview,
              keyPoints: meetingData.summary.keyPoints,
              decisions: meetingData.summary.decisions,
              nextSteps: meetingData.summary.nextSteps,
              rawContent: JSON.stringify(meetingData.summary),
            },
          },
          actionItems: {
            create: meetingData.actionItems.map((item) => ({
              text: item.text,
              assignee: item.assignee,
              completed: false,
            })),
          },
          highlights: {
            create: meetingData.highlights.map((h) => ({
              title: h.title,
              startTime: h.startTime,
              endTime: h.endTime,
              note: h.note,
            })),
          },
        },
      })
      createdMeetings.push(meeting)
    }

    return NextResponse.json({
      message: `Seeded ${createdMeetings.length} meetings successfully`,
      meetingIds: createdMeetings.map((m) => m.id),
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
