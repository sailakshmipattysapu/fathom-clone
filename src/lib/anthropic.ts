import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function generateMeetingSummary(
  transcript: string,
  template: string = 'general'
): Promise<{
  overview: string
  keyPoints: string[]
  decisions: string[]
  nextSteps: string[]
}> {
  const templatePrompts: Record<string, string> = {
    general: 'general business meeting',
    sales: 'sales call - focus on customer needs, objections, and next steps',
    engineering: 'engineering discussion - focus on technical decisions, blockers, and action items',
    '1on1': 'one-on-one meeting - focus on personal goals, feedback, and career development',
  }

  const templateContext = templatePrompts[template] || templatePrompts.general

  const response = await anthropic.messages.create({
    model: 'claude-haiku-20240307',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are analyzing a ${templateContext} transcript. Extract the following and respond with valid JSON only:

{
  "overview": "2-3 sentence overview of the meeting",
  "keyPoints": ["key point 1", "key point 2", "key point 3"],
  "decisions": ["decision made 1", "decision made 2"],
  "nextSteps": ["next step 1", "next step 2", "next step 3"]
}

Transcript:
${transcript}`,
      },
    ],
  })

  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  const jsonMatch = content.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON found in response')

  return JSON.parse(jsonMatch[0])
}

export async function extractActionItems(transcript: string): Promise<
  Array<{ text: string; assignee: string | null }>
> {
  const response = await anthropic.messages.create({
    model: 'claude-haiku-20240307',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `Extract all action items from this meeting transcript. Respond with valid JSON only:

[
  {"text": "action item description", "assignee": "person name or null"}
]

Transcript:
${transcript}`,
      },
    ],
  })

  const content = response.content[0]
  if (content.type !== 'text') return []

  const jsonMatch = content.text.match(/\[[\s\S]*\]/)
  if (!jsonMatch) return []

  return JSON.parse(jsonMatch[0])
}
