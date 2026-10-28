import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const meeting = await prisma.meeting.findFirst({
    where: {
      id: params.id,
      userId: session.user.id,
    },
    include: {
      transcript: {
        orderBy: { order: 'asc' },
      },
      summary: true,
      actionItems: {
        orderBy: { createdAt: 'asc' },
      },
      highlights: {
        orderBy: { startTime: 'asc' },
      },
      shares: true,
    },
  })

  if (!meeting) {
    return NextResponse.json({ error: 'Meeting not found' }, { status: 404 })
  }

  return NextResponse.json(meeting)
}

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const meeting = await prisma.meeting.findFirst({
    where: { id: params.id, userId: session.user.id },
  })

  if (!meeting) {
    return NextResponse.json({ error: 'Meeting not found' }, { status: 404 })
  }

  await prisma.meeting.delete({ where: { id: params.id } })

  return NextResponse.json({ message: 'Meeting deleted' })
}
