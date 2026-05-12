import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import { formatDate } from '../utils/formatDate.js'
import { ROUTES } from '../utils/constants.js'
import { getHistoryApi } from '../api/analysisApi.js'

const BORDER = '#d1e3f8'
const PRIMARY = '#2a7fd4'
const TITLE_COLOR = '#1a1a2e'
const CARD_SHADOW = '0 2px 12px rgba(26, 26, 46, 0.08)'



export default function HistoryPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])

  useEffect(()=> {
    async function loadHistory() {
      try {
        const data = await getHistoryApi()
        setItems(data)
      }catch(err) {
        console.error(err)
        setError('Failed to load history')
      }finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [])

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: CARD_SHADOW,
    border: `1px solid ${BORDER}`,
    padding: '18px 20px',
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
          Analysis History
        </h1>
        <p style={{ margin: 0, fontSize: '16px', color: '#4b5563' }}>
          Your previous breast cancer analyses
        </p>
      </header>

      <ErrorMessage message={error} />

      {loading ? (
        <LoadingSpinner />
      ) : items.length === 0 ? (
        <p
          style={{
            marginTop: error ? '20px' : 0,
            padding: '32px 16px',
            textAlign: 'center',
            fontSize: '16px',
            color: '#6b7280',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: CARD_SHADOW,
            border: `1px solid ${BORDER}`,
          }}
        >
          No analyses yet
        </p>
      ) : (
        <ul
          style={{
            margin: error ? '20px 0 0' : '0',
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {items.map((item) => (
            <li key={item.analysis_id} style={cardStyle}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                  <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#6b7280' }}>
                    {formatDate(item.date)}
                  </p>
                  <p
                    style={{
                      margin: '0 0 10px',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: TITLE_COLOR,
                      wordBreak: 'break-word',
                    }}
                  >
                    {item.filename}
                  </p>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#ffffff',
                      backgroundColor: item.has_tumor ? '#dc2626' : '#16a34a',
                    }}
                  >
                    {item.has_tumor ? 'Tumor detected' : 'No tumor indicated'}
                  </span>
                </div>
                <Link
                  to={ROUTES.analysisDetail(item.analysis_id)}
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: PRIMARY,
                    textDecoration: 'none',
                    alignSelf: 'center',
                  }}
                >
                  View Details →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </PageContainer>
  )
}
