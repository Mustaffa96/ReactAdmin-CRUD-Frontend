import { DataProvider } from 'react-admin';
import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:5000/api';
const httpClient = async (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('Content-Type', 'application/json');
    
    console.log('Attempting fetch to:', url, 'with options:', options);
    
    try {
        const response = await fetchUtils.fetchJson(url, options);
        console.log('Response received:', response);
        return response;
    } catch (error: any) {
        console.error('HTTP Client Error:', {
            message: error.message,
            status: error.status,
            url: url,
            options: options,
            stack: error.stack
        });
        throw error;
    }
};

export const dataProvider: DataProvider = {
    getList: async (resource) => {
        const resourcePath = resource === 'note' ? 'notes' : resource;
        const url = `${apiUrl}/${resourcePath}`;
        
        const { json } = await httpClient(url);
        return {
            data: json.map((record: any) => ({
                ...record,
                id: record._id // Assuming MongoDB-style IDs
            })),
            total: json.length,
        };
    },

    getOne: async (resource, params) => {
        const resourcePath = resource === 'note' ? 'notes' : resource;
        const { json } = await httpClient(`${apiUrl}/${resourcePath}/${params.id}`);
        return {
            data: {
                ...json,
                id: json._id,
            },
        };
    },

    create: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        });
        return {
            data: {
                ...json,
                id: json._id,
            },
        };
    },

    update: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });
        return {
            data: {
                ...json,
                id: json._id,
            },
        };
    },

    delete: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        });
        return { data: json };
    },

    // Required for react-admin
    deleteMany: async (resource, params) => {
        const responses = await Promise.all(
            params.ids.map(id => 
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        );
        return { data: responses.map(({ json }) => json.id) };
    },

    updateMany: async (resource, params) => {
        const responses = await Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                })
            )
        );
        return { data: params.ids };
    },

    getMany: async (resource, params) => {
        const responses = await Promise.all(
            params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`))
        );
        return { data: responses.map(({ json }) => ({
            ...json,
            id: json._id,
        }))};
    },

    getManyReference: async (resource, params) => {
        const url = `${apiUrl}/${resource}?${params.target}=${params.id}`;
        const { json } = await httpClient(url);
        return {
            data: json.map((record: any) => ({
                ...record,
                id: record._id,
            })),
            total: json.length,
        };
    },
};