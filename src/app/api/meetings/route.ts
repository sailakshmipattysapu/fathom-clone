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
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const search = searchParams.get('search') || ''
  const skip = (page - 1) * limit

  const where = {
    userId: session.user.id,
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  }

  const [meetings, total] = await Promise.all([
    prisma.meeting.findMany({
      where,
      orderBy: { date: 'desc' },
      skip,
      take: limit,
      include: {
        summary: true,
        _count: {
          select: {
            transcript: true,
            actionItems: true,
            highlights: true,
          },
        },
      },
    }),
    prisma.meeting.count({ where }),
  ])

  return NextResponse.json({
    meetings,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, date, duration, platform, attendees } = body

    if (!title || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const meeting = await prisma.meeting.create({
      data: {
        title,
        date: new Date(date),
        duration: duration || 0,
        platform: platform || 'zoom',
        attendees: attendees || [],
        userId: session.user.id,
      },
    })

    return NextResponse.json(meeting, { status: 201 })
  } catch (error) {
    console.error('Create meeting error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
