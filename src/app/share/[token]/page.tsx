import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { formatDate, formatTime, formatDuration, platformIcon } from '@/lib/utils'
import Link from 'next/link'

interface Props {
  params: Promise<{ token: string }>
}

export default async function SharedClipPage(props: Props) {
  const params = await props.params
  const share = await prisma.sharedClip.findUnique({
    where: { token: params.token },
    include: {
      meeting: {
        include: {
          transcript: {
            orderBy: { order: 'asc' },
          },
        },
      },
    },
  })

  if (!share) {
    notFound()
  }

  const meeting = share.meeting
  const date = new Date(meeting.date)

  // Filter transcript to the clip range
  const clipSegments = meeting.transcript.filter(
    (seg) => seg.startTime >= share.startTime && seg.endTime <= share.endTime + 5
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          fathom
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">Shared meeting clip</span>
          <Link
            href="/signup"
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            Get Fathom free
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Meeting info */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>{platformIcon(meeting.platform)}</span>
            <span className="capitalize">{meeting.platform}</span>
            <span>·</span>
            <span>{formatDate(date)}</span>
            <span>·</span>
            <span>{formatTime(date)}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{share.title}</h1>
          <p className="text-sm text-gray-500">
            Clip: {formatDuration(share.startTime)} – {formatDuration(share.endTime)}
          </p>
        </div>

        {/* Video placeholder */}
        <div className="bg-gray-900 rounded-2xl aspect-video flex items-center justify-center mb-8 relative overflow-hidden">
          {meeting.videoUrl ? (
            <video
              src={meeting.videoUrl}
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-gray-400 text-sm">Video not available</p>
              </div>
            </div>
          )}
        </div>

        {/* Transcript clip */}
        {clipSegments.length > 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50">
              <h2 className="text-sm font-semibold text-gray-700">Transcript</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {clipSegments.map((seg) => (
                <div key={seg.id} className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">
                      {seg.speaker[0]}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{seg.speaker}</span>
                    <span className="text-xs text-gray-400">{formatDuration(seg.startTime)}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed ml-8">{seg.text}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-gray-500 text-sm">No transcript available for this clip.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 bg-blue-600 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            Want AI summaries for your meetings?
          </h3>
          <p className="text-blue-200 text-sm mb-6">
            Fathom automatically records, transcribes, and summarizes every meeting. Free forever.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Get Fathom for free →
          </Link>
        </div>
      </div>
    </div>
  )
}
