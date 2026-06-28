import { useState } from 'react'

const initialMessage =
  "Ask me about Yi Wei's experience, projects, Waterloo background, or technical skills."

function PortfolioAssistant() {
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: initialMessage,
    },
  ])
  const [isSending, setIsSending] = useState(false)
  const [chatError, setChatError] = useState('')

  const sendChatMessage = async (event) => {
    event.preventDefault()

    const message = chatInput.trim()
    if (!message || isSending) return

    setChatInput('')
    setChatError('')
    setIsSending(true)
    setChatMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', content: message },
    ])

    try {
      const response = await fetch('/api/chat', {
        body: JSON.stringify({ message }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const contentType = response.headers.get('content-type') ?? ''
      let data = null

      if (contentType.includes('application/json')) {
        data = await response.json()
      } else {
        const rawText = await response.text()
        throw new Error(
          rawText.includes('<!doctype') || rawText.includes('<html')
            ? 'AI backend is not running. Use npm run dev:full, or start npm run api and npm run dev together.'
            : 'AI assistant returned an unexpected response format.',
        )
      }

      if (!response.ok) {
        throw new Error(data.error ?? 'AI assistant is unavailable.')
      }

      setChatMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', content: data.reply },
      ])
    } catch (error) {
      setChatError(error instanceof Error ? error.message : 'AI assistant is unavailable.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <article className="assistant-card">
      <p className="eyebrow">Ask Yi Wei AI</p>
      <h3>Portfolio assistant</h3>
      <p className="assistant-copy">
        Ask about experience, projects, awards, or technical strengths and get
        answers grounded in the resume.
      </p>

      <div className="chat-window">
        {chatMessages.map((message, index) => (
          <div className={`chat-bubble ${message.role}`} key={`${message.role}-${index}`}>
            {message.content}
          </div>
        ))}
        {isSending && <div className="chat-bubble assistant">Thinking...</div>}
      </div>

      {chatError && <p className="chat-error">{chatError}</p>}

      <form className="chat-input" onSubmit={sendChatMessage}>
        <input
          aria-label="Ask Yi Wei AI"
          onChange={(event) => setChatInput(event.target.value)}
          placeholder="Ask something about Yi Wei..."
          value={chatInput}
        />
        <button disabled={isSending || !chatInput.trim()} type="submit">
          Send
        </button>
      </form>
    </article>
  )
}

export default PortfolioAssistant
