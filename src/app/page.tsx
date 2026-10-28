import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-10">
              <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
                fathom
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </Link>
                <Link href="#integrations" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Integrations
                </Link>
                <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
                <Link href="#enterprise" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Enterprise
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Get started free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Now with AI-powered summaries for every meeting
          </div>
          <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            Never take meeting
            <span className="text-blue-600"> notes again.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Fathom records, transcribes, highlights, and summarizes your meetings so you can focus
            fully on the conversation. Free forever, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-blue-200"
            >
              Get Fathom for free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="text-sm text-gray-400">No credit card required · Free forever plan</p>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Works with Zoom, Meet & Teams
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              SOC 2 Type II certified
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              GDPR compliant
            </div>
          </div>
        </div>

        {/* Demo video placeholder */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl aspect-video flex items-center justify-center group cursor-pointer">
            {/* Fake screen content */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="flex-1 mx-4 bg-gray-700 rounded h-5"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center mt-10">
                <div className="grid grid-cols-3 gap-4 p-8 w-full max-w-2xl opacity-30">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-700 rounded-lg aspect-video"></div>
                  ))}
                </div>
              </div>
            </div>
            {/* Play button */}
            <div className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all group-hover:scale-105">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <span className="text-white/60 text-sm">Watch 2-min demo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
            Trusted by 50,000+ teams at companies like
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Stripe', 'Notion', 'Linear', 'Vercel', 'Figma', 'Loom', 'Rippling', 'Retool', 'Airtable', 'Zapier'].map((company) => (
              <div key={company} className="bg-white border border-gray-200 rounded-full px-5 py-2 text-sm font-semibold text-gray-700 shadow-sm">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need from every meeting
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Stop spending mental energy on note-taking. Fathom handles everything so you stay present in the conversation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎙️',
                title: 'Real-time Transcription',
                description: 'Highly accurate transcription in real time, with speaker labels so you always know who said what.',
              },
              {
                icon: '✨',
                title: 'AI Summaries',
                description: 'Get instant AI-generated summaries tailored to your meeting type — sales calls, engineering standups, 1:1s, and more.',
              },
              {
                icon: '✅',
                title: 'Action Items',
                description: 'Automatically extracted action items with assignees, so nothing falls through the cracks after the meeting ends.',
              },
              {
                icon: '⭐',
                title: 'Highlights',
                description: 'Clip the most important moments from any meeting and share them with your team in seconds.',
              },
              {
                icon: '🔍',
                title: 'Powerful Search',
                description: 'Search across all your meetings instantly. Find any decision, quote, or discussion in seconds, not hours.',
              },
              {
                icon: '🔌',
                title: 'Deep Integrations',
                description: 'Sync action items to Notion, send summaries to Slack, log calls in HubSpot — automatically.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:border-blue-100 transition-all group"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-blue-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Fathom works</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Set it up once, and Fathom automatically joins and processes every meeting.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Connect your calendar', desc: 'Link Google or Outlook calendar. Fathom auto-joins scheduled meetings.' },
              { step: '02', title: 'Fathom joins your call', desc: 'Fathom\'s bot joins as a participant and records the meeting with consent.' },
              { step: '03', title: 'AI processes everything', desc: 'Transcript, summary, action items and highlights are ready within minutes.' },
              { step: '04', title: 'Share and sync', desc: 'Send summaries to Slack, sync action items to Notion or HubSpot automatically.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Works with your entire stack</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Fathom fits into the tools your team already uses every day.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Zoom', emoji: '📹', color: 'blue' },
              { name: 'Google Meet', emoji: '🟢', color: 'green' },
              { name: 'Microsoft Teams', emoji: '🟣', color: 'purple' },
              { name: 'Slack', emoji: '💬', color: 'pink' },
              { name: 'Notion', emoji: '📝', color: 'gray' },
              { name: 'HubSpot', emoji: '🧡', color: 'orange' },
            ].map((integration) => (
              <div
                key={integration.name}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center gap-3 hover:shadow-md hover:border-blue-100 transition-all"
              >
                <span className="text-4xl">{integration.emoji}</span>
                <span className="text-sm font-medium text-gray-700 text-center">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Start free. Upgrade when you need more. No surprises.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Perfect for individuals getting started.</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {['5 meetings per month', 'AI transcription', 'Basic summaries', 'Action item extraction', '30-day storage'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors">
                Get started free
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-blue-600 rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-xl shadow-blue-200">
              <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most popular
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">$15</span>
                  <span className="text-blue-200">/month</span>
                </div>
                <p className="text-sm text-blue-200 mt-2">For professionals who run many meetings.</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {['Unlimited meetings', 'AI transcription + summaries', 'Template-based summaries', 'Slack & Notion integrations', 'Unlimited storage', 'Priority support', 'Shareable clips'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white">
                    <svg className="w-4 h-4 text-blue-200 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors">
                Start Pro trial
              </Link>
            </div>

            {/* Enterprise */}
            <div id="enterprise" className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Enterprise</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">Custom</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">For teams and organizations at scale.</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {['Everything in Pro', 'SSO / SAML', 'Admin dashboard', 'HubSpot CRM integration', 'Custom data retention', 'SLA & dedicated support', 'SOC 2 Type II', 'Volume discounts'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                Contact sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to reclaim your focus?
          </h2>
          <p className="text-xl text-blue-200 mb-10">
            Join 50,000+ professionals who never take meeting notes again.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-colors shadow-xl"
          >
            Get Fathom for free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-blue-300 text-sm mt-4">Free forever plan · No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="text-2xl font-bold text-white mb-3">fathom</div>
              <p className="text-sm text-gray-500 max-w-xs">
                Never take meeting notes again. AI-powered meeting assistant for modern teams.
              </p>
              <div className="flex gap-4 mt-6">
                {['Twitter', 'LinkedIn', 'YouTube'].map((social) => (
                  <a key={social} href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            {[
              {
                label: 'Product',
                links: ['Features', 'Integrations', 'Pricing', 'Changelog', 'Roadmap'],
              },
              {
                label: 'Company',
                links: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
              },
              {
                label: 'Legal',
                links: ['Privacy', 'Terms', 'Security', 'Cookie policy'],
              },
            ].map((col) => (
              <div key={col.label}>
                <h4 className="text-white font-semibold text-sm mb-4">{col.label}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">© 2026 Fathom Clone. All rights reserved.</p>
            <p className="text-sm text-gray-600">Made with ❤️ for focused teams</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
