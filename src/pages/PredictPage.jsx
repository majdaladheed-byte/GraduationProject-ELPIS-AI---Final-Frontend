import { useRef, useState } from 'react'
import PageContainer from '../components/layout/PageContainer.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'

const BORDER = '#d1e3f8'
const PRIMARY = '#2a7fd4'
const TITLE_COLOR = '#1a1a2e'
const CARD_SHADOW = '0 2px 12px rgba(26, 26, 46, 0.08)'

const ACCEPT_ATTR = 'image/jpeg,image/png,.jpg,.jpeg,.png'

function isAllowedImage(file) {
  if (!file) return false
  const okTypes = ['image/jpeg', 'image/png']
  if (okTypes.includes(file.type)) return true
  return /\.(jpe?g|png)$/i.test(file.name)
}

export default function PredictPage() {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const pickFile = (next) => {
    if (!next || !isAllowedImage(next)) {
      setError('Please choose a JPG or PNG image.')
      return
    }
    setError('')
    setFile(next)
  }

  const handleInputChange = (e) => {
    const next = e.target.files?.[0]
    pickFile(next)
    e.target.value = ''
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const next = e.dataTransfer.files?.[0]
    pickFile(next)
  }

  const handleBrowseClick = () => {
    inputRef.current?.click()
  }

  const handleAnalyze = () => {
    /* Phase 3: call prediction API */
  }

  const cardBase = {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: CARD_SHADOW,
  }

  return (
    <PageContainer>
      <header style={{ marginBottom: '28px' }}>
        <h1
          style={{
            margin: '0 0 8px',
            fontSize: '26px',
            fontWeight: 700,
            color: TITLE_COLOR,
          }}
        >
          Breast Cancer Detection
        </h1>
        <p style={{ margin: 0, fontSize: '16px', color: '#4b5563' }}>
          Upload an ultrasound image to analyze
        </p>
      </header>

      <ErrorMessage message={error} />

      <div
        role="button"
        tabIndex={0}
        onClick={handleBrowseClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleBrowseClick()
          }
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          ...cardBase,
          marginTop: error ? '16px' : 0,
          border: `2px dashed ${BORDER}`,
          padding: '36px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_ATTR}
          style={{ display: 'none' }}
          onChange={handleInputChange}
        />
        <p style={{ margin: '0 0 10px', fontSize: '15px', color: PRIMARY, fontWeight: 600 }}>
          Click to upload or drag and drop
        </p>
        <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>JPG or PNG only</p>
        {file ? (
          <p style={{ margin: '14px 0 0', fontSize: '14px', color: TITLE_COLOR, fontWeight: 500 }}>
            Selected: {file.name}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        disabled={!file}
        onClick={handleAnalyze}
        style={{
          marginTop: '18px',
          padding: '12px 22px',
          fontSize: '15px',
          fontWeight: 600,
          color: '#ffffff',
          backgroundColor: !file ? '#93c5ec' : PRIMARY,
          border: 'none',
          borderRadius: '8px',
          cursor: !file ? 'not-allowed' : 'pointer',
          width: '100%',
          maxWidth: '280px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Analyze Image
      </button>

      {loading ? <LoadingSpinner /> : null}

      {result ? (
        <section
          style={{
            ...cardBase,
            marginTop: '28px',
            padding: '20px',
            border: `1px solid ${BORDER}`,
          }}
        >
          <h2 style={{ margin: '0 0 16px', fontSize: '18px', color: TITLE_COLOR }}>Result</h2>

          <div style={{ marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
              Status
            </span>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#ffffff',
                backgroundColor: result.has_tumor ? '#dc2626' : '#16a34a',
              }}
            >
              {result.has_tumor ? 'Tumor detected' : 'No tumor indicated'}
            </span>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
              Tumor type
            </span>
            <span style={{ fontSize: '15px', color: TITLE_COLOR }}>
              {result.tumor_type != null && result.tumor_type !== ''
                ? result.tumor_type
                : '—'}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '8px' }}>
              Mask
            </span>
            {result.mask_path ? (
              <img
                src={result.mask_path}
                alt="Segmentation mask"
                style={{
                  maxWidth: '100%',
                  borderRadius: '8px',
                  border: `1px solid ${BORDER}`,
                }}
              />
            ) : (
              <span style={{ fontSize: '15px', color: '#9ca3af' }}>No mask image</span>
            )}
          </div>
        </section>
      ) : null}
    </PageContainer>
  )
}
