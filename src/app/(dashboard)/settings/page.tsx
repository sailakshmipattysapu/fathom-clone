'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { toast } from 'sonner'

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const user = session?.user

  const [name, setName] = useState(user?.name || '')
  const [saving, setSaving] = useState(false)
  const [notifications, setNotifications] = useState({
    emailSummary: true,
    emailActionItems: true,
    slackSummary: false,
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    // Stub: in a real app, call PATCH /api/user
    await new Promise((r) => setTimeout(r, 800))
    toast.success('Profile updated')
    setSaving(false)
  }

  async function handleDeleteAccount() {
    // Stub: in a real app, call DELETE /api/user
    toast.error('Account deletion is disabled in the demo.')
    setShowDeleteConfirm(false)
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <section className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-5">Profile</h2>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              {user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt={user.name || ''} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                (user?.name || 'U').slice(0, 2).toUpperCase()
              )}
            </div>
            <div>
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Change photo
              </button>
              <p className="text-xs text-gray-500 mt-0.5">JPG, PNG up to 2MB</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </section>

      {/* Notifications */}
      <section className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-5">Notifications</h2>
        <div className="space-y-4">
          {[
            {
              key: 'emailSummary' as const,
              label: 'Email meeting summaries',
              description: 'Receive an email with the AI summary after each meeting.',
            },
            {
              key: 'emailActionItems' as const,
              label: 'Email action items',
              description: 'Get action items assigned to you emailed after meetings.',
            },
            {
              key: 'slackSummary' as const,
              label: 'Slack summary (requires Slack integration)',
              description: 'Post summaries to a Slack channel automatically.',
            },
          ].map((notif) => (
            <div key={notif.key} className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-gray-800">{notif.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{notif.description}</div>
              </div>
              <button
                onClick={() =>
                  setNotifications((prev) => ({ ...prev, [notif.key]: !prev[notif.key] }))
                }
                className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifications[notif.key] ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={notifications[notif.key]}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    notifications[notif.key] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Security */}
      <section className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-5">Security</h2>
        <div className="space-y-4">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out of all devices
          </button>
        </div>
      </section>

      {/* Danger zone */}
      <section className="bg-white border border-red-100 rounded-xl p-6">
        <h2 className="text-base font-semibold text-red-700 mb-2">Danger zone</h2>
        <p className="text-sm text-gray-500 mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors"
          >
            Delete account
          </button>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700 font-medium mb-3">
              Are you absolutely sure? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                className="text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                Yes, delete my account
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
