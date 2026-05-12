import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import { formatDate } from '../utils/formatDate.js'
import { ROUTES } from '../utils/constants.js'
import { useParams } from 'react-router-dom'
import {getAnalysisDetailsApi} from '../api/analysisApi.js'

const BORDER = '#d1e3f8'
const PRIMARY = '#2a7fd4'
const TITLE_COLOR = '#1a1a2e'
const CARD_SHADOW = '0 2px 12px rgba(26, 26, 46, 0.08)'



export default function AnalysisDetailsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const {id} = useParams()

  useEffect(() => {
   async function loadAnalysis() {
     try {
      const data = await getAnalysisDetailsApi(id)
      setAnalysis(data)
     }catch (err) {
      console.error(err)
      setError('Failed to load analysis')
     }finally {
      setLoading(false)
     }
   }

   loadAnalysis()
}, [id])

  if (!analysis) {
    return (
      <PageContainer>
        <h2>No analysis selected</h2>
      </PageContainer>
    )
  }
  return (
    <PageContainer>
      <Link
        to={ROUTES.history}
        style={{
          display: 'inline-block',
          marginBottom: '16px',
          color: PRIMARY,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '14px',
        }}
      >
        ← Back to History
      </Link>

      <h1
        style={{
          margin: '0 0 24px',
          fontSize: '26px',
          fontWeight: 700,
          color: TITLE_COLOR,
        }}
      >
        Analysis Details
      </h1>

      <ErrorMessage message={error} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <section
          style={{
            marginTop: error ? '16px' : 0,
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: CARD_SHADOW,
            border: `1px solid ${BORDER}`,
            padding: '20px',
          }}
        >
          <div style={{ marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
              Date
            </span>
            <span style={{ fontSize: '15px', color: TITLE_COLOR }}>{formatDate(analysis.date)}</span>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
              Filename
            </span>
            <span style={{ fontSize: '15px', color: TITLE_COLOR }}>{analysis.image}</span>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
              Status
            </span>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#ffffff',
                backgroundColor: analysis.has_tumor ? '#dc2626' : '#16a34a',
              }}
            >
              {analysis.has_tumor ? 'Tumor detected' : 'No tumor indicated'}
            </span>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
              Tumor type
            </span>
            <span style={{ fontSize: '15px', color: TITLE_COLOR }}>{analysis.tumor_type || '—'}</span>
          </div>

          <div>
            <span style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '8px' }}>
              Mask
            </span>
            {analysis.mask_path ? (
              <img
                src={analysis.mask_path}
                alt="Segmentation mask"
                style={{
                  width: '100%',
                  maxWidth: '700px',
                  borderRadius: '8px',
                  border: `1px solid ${BORDER}`,
                }}
              />
            ) : (
              <span style={{ fontSize: '15px', color: '#9ca3af' }}>No mask image</span>
            )}
          </div>
        </section>
      )}
    </PageContainer>
  )
}
