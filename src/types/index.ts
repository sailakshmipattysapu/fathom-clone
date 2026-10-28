import { Meeting, TranscriptSegment, MeetingSummary, ActionItem, Highlight, SharedClip } from '@prisma/client'

export type MeetingWithRelations = Meeting & {
  transcript: TranscriptSegment[]
  summary: MeetingSummary | null
  actionItems: ActionItem[]
  highlights: Highlight[]
  shares: SharedClip[]
}

export type MeetingCard = Meeting & {
  _count: {
    transcript: number
    actionItems: number
    highlights: number
  }
  summary: MeetingSummary | null
}

export type Attendee = {
  name: string
  email: string
  avatarUrl: string
}

export type SummaryTemplate = 'general' | 'sales' | 'engineering' | '1on1'

export interface SearchResult {
  meetingId: string
  meetingTitle: string
  meetingDate: Date
  segments: TranscriptSegment[]
}
