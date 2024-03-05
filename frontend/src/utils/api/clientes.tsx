import { apiEndpoint } from "./apiEndpoint"

export interface ClientesData {
    cliente_id?: string | number;
    nome: string; 
    email: string;
    telefone: string    
    coordenada_x: string;
    coordenada_y: string;
}

export const getClientes = async () => {
    try {
        const res = await apiEndpoint.get('api/cliente')
        return res.data;
    } catch (error) {
        throw 500
    }
}

export const postClientes = async (data: ClientesData) => {
    try {
        const res = await apiEndpoint.post('api/cliente', data)
        return res.data;
    } catch (error) {
        throw 500
    }
}

export const putClientes = async (id: string, data: ClientesData) => {
    try {
        const res = await apiEndpoint.put(`api/cliente/${id}`, data)
        return res.data;
    } catch (error) {
        throw 500
    }
}

export const deleteClientes = async (id: string) => {
    try {
        const res = await apiEndpoint.delete(`api/cliente/${id}`)
        return res.data;
    } catch (error) {
        throw 500
    }
}
