import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'

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
    const { startTime, endTime, title } = await req.json()

    const meeting = await prisma.meeting.findFirst({
      where: { id: params.id, userId: session.user.id },
    })

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 })
    }

    const token = randomBytes(16).toString('hex')

    const share = await prisma.sharedClip.create({
      data: {
        meetingId: params.id,
        token,
        startTime: startTime || 0,
        endTime: endTime || (meeting.duration || 0),
        title: title || meeting.title,
      },
    })

    const shareUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/share/${token}`

    return NextResponse.json({ share, shareUrl }, { status: 201 })
  } catch (error) {
    console.error('Create share error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
