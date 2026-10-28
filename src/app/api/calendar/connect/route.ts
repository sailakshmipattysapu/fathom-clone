import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Stub: mark user's calendar as connected
    await prisma.user.update({
      where: { id: session.user.id },
      data: { calendarConnected: true },
    })

    return NextResponse.json({ message: 'Calendar connected successfully' })
  } catch (error) {
    console.error('Calendar connect error:', error)
    return NextResponse.json({ error: 'Failed to connect calendar' }, { status: 500 })
  }
}
