import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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
    const { title, startTime, endTime, note } = await req.json()

    if (!title || startTime === undefined || endTime === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const meeting = await prisma.meeting.findFirst({
      where: { id: params.id, userId: session.user.id },
    })

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 })
    }

    const highlight = await prisma.highlight.create({
      data: {
        meetingId: params.id,
        title,
        startTime,
        endTime,
        note: note || null,
      },
    })

    return NextResponse.json(highlight, { status: 201 })
  } catch (error) {
    console.error('Create highlight error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const highlights = await prisma.highlight.findMany({
    where: {
      meetingId: params.id,
      meeting: { userId: session.user.id },
    },
    orderBy: { startTime: 'asc' },
  })

  return NextResponse.json(highlights)
}
