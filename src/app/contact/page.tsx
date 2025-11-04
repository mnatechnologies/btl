"use client"
import { useState } from "react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Failed to send message")
      setStatus({ ok: true, msg: data?.message || "Message sent! We'll be in touch soon." })
      setName("")
      setEmail("")
      setMessage("")
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || "Unable to send. Please try again later." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className=" bg-black">
        <div className="max-w-2xl py-4 py-10 mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>
          <p className="text-muted-foreground mb-8">Have a question about an order or our products? Send us a message and we'll get back to you.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full font-display text-black bg-white border border-black px-3 py-2"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full font-display text-black bg-white border border-black px-3 py-2"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white text-black font-display border border-black px-3 py-2 min-h-[140px]"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer border  rounded bg-black text-white px-4 py-2 disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send message"}
            </button>
          </form>

          {status && (
            <div className={`mt-4 text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}>
              {status.msg}
            </div>
          )}
        </div>
    </main>
  )
}
