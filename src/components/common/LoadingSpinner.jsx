export default function LoadingSpinner() {
  return (
    <>
      <style>{`
        @keyframes loading-spinner-rotate {
          to {
            transform: rotate(360deg);
          }
        }
        .loading-spinner__circle {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(42, 127, 212, 0.25);
          border-top-color: #2a7fd4;
          border-radius: 50%;
          animation: loading-spinner-rotate 0.75s linear infinite;
        }
      `}</style>
      <div
        role="status"
        aria-label="Loading"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '24px',
        }}
      >
        <div className="loading-spinner__circle" aria-hidden />
      </div>
    </>
  )
}
