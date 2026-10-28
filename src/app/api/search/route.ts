import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') || ''

  if (!query.trim()) {
    return NextResponse.json({ results: [] })
  }

  // Search transcript segments
  const segments = await prisma.transcriptSegment.findMany({
    where: {
      text: { contains: query, mode: 'insensitive' },
      meeting: { userId: session.user.id },
    },
    include: {
      meeting: {
        select: {
          id: true,
          title: true,
          date: true,
          platform: true,
        },
      },
    },
    orderBy: {
      meeting: { date: 'desc' },
    },
    take: 50,
  })

  // Group by meeting
  const grouped = segments.reduce(
    (acc, seg) => {
      const meetingId = seg.meeting.id
      if (!acc[meetingId]) {
        acc[meetingId] = {
          meetingId,
          meetingTitle: seg.meeting.title,
          meetingDate: seg.meeting.date,
          platform: seg.meeting.platform,
          segments: [],
        }
      }
      acc[meetingId].segments.push(seg)
      return acc
    },
    {} as Record<string, any>
  )

  return NextResponse.json({ results: Object.values(grouped) })
}
