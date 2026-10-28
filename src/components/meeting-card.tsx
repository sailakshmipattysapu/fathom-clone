'use client'

import Link from 'next/link'
import { formatDuration, formatTimeAgo, platformIcon, getPlatformColor } from '@/lib/utils'

interface Meeting {
  id: string
  title: string
  date: string
  duration: number
  platform: string
  attendees: Array<{ name: string; email: string; avatarUrl: string }>
  summary: { overview: string } | null
  _count: { transcript: number; actionItems: number; highlights: number }
}

interface MeetingCardProps {
  meeting: Meeting
}

const PLATFORM_LABELS: Record<string, string> = {
  zoom: 'Zoom',
  meet: 'Google Meet',
  teams: 'Teams',
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const date = new Date(meeting.date)
  const attendees = meeting.attendees || []

  return (
    <Link href={`/meetings/${meeting.id}`}>
      <div className="bg-white border border-gray-100 rounded-xl px-6 py-5 hover:shadow-md hover:border-blue-100 transition-all group cursor-pointer">
        <div className="flex items-start gap-4">
          {/* Platform icon */}
          <div className="w-10 h-10 flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center text-xl border border-gray-100">
            {platformIcon(meeting.platform)}
          </div>

          <div className="flex-1 min-w-0">
            {/* Title row */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-700 transition-colors truncate">
                  {meeting.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span className={`font-medium ${getPlatformColor(meeting.platform)}`}>
                    {PLATFORM_LABELS[meeting.platform] || meeting.platform}
                  </span>
                  <span>·</span>
                  <span>{formatTimeAgo(date)}</span>
                  <span>·</span>
                  <span>{formatDuration(meeting.duration)}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex-shrink-0 flex items-center gap-2">
                {meeting._count.actionItems > 0 && (
                  <div className="flex items-center gap-1 text-xs font-medium text-orange-700 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {meeting._count.actionItems} action{meeting._count.actionItems !== 1 ? 's' : ''}
                  </div>
                )}
                {meeting._count.highlights > 0 && (
                  <div className="flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-50 border border-yellow-100 px-2.5 py-1 rounded-full">
                    ⭐ {meeting._count.highlights}
                  </div>
                )}
              </div>
            </div>

            {/* Summary preview */}
            {meeting.summary?.overview && (
              <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
                {meeting.summary.overview}
              </p>
            )}

            {/* Bottom row */}
            <div className="mt-3 flex items-center justify-between">
              {/* Attendee avatars */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {attendees.slice(0, 4).map((attendee, i) => (
                    <div
                      key={i}
                      title={attendee.name}
                      className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-700 overflow-hidden"
                    >
                      {attendee.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={attendee.avatarUrl} alt={attendee.name} className="w-full h-full object-cover" />
                      ) : (
                        attendee.name[0]
                      )}
                    </div>
                  ))}
                  {attendees.length > 4 && (
                    <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500 font-medium">
                      +{attendees.length - 4}
                    </div>
                  )}
                </div>
                {attendees.length > 0 && (
                  <span className="text-xs text-gray-400">
                    {attendees.length} attendee{attendees.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>

              <svg
                className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
