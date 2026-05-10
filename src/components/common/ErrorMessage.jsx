export default function ErrorMessage({ message }) {
  if (!message) return null

  return (
    <div
      role="alert"
      style={{
        padding: '12px 14px',
        borderRadius: '6px',
        borderLeft: '4px solid #dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.08)',
        color: '#dc2626',
        fontSize: '14px',
        lineHeight: 1.4,
      }}
    >
      {message}
    </div>
  )
}
