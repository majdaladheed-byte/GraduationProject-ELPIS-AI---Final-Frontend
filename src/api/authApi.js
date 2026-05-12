import client from './client'
import {ROUTES} from '../utils/constants'


export async function registerApi(data){
    const response = await client.post(ROUTES.register,data)
    return response.data
}

export async function loginApi(data){
    const response = await client.post(ROUTES.login,data)
    return response.data
}
