import client from './client'
import { ROUTES } from '../utils/constants'

export async function predictApi(file) {
  const formData = new FormData()

  formData.append('file', file)

  const response = await client.post(
    ROUTES.predict,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return response.data
}

export async function getHistoryApi() {
  const response = await client.get(ROUTES.history)
  return response.data
}

export async function getAnalysisDetailsApi(id) {
  const response = await client.get(`/analysis/${id}`)
  return response.data
}
