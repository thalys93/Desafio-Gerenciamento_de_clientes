import { apiEndpoint } from "./apiEndpoint"

export interface CalculoProps {
    x: number
    y: number
}

export const sendCalculo = async (data: CalculoProps) => {
    try {
        const res = await apiEndpoint.post('utils/calculo', data)
        return res.data
    } catch {
        throw 500
    }
}