 const API_URL = import.meta.env.VITE_API_URL
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token')

    if (!refreshToken) {
        throw new Error('No refresh token')
    }

    const response = await fetch(
        `${API_URL}/api/token/refresh/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: refreshToken,
            }),
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error('Refresh token expired')
    }

    localStorage.setItem('access_token', data.access)

    return data.access
}


export const apiFetch = async (url, options = {}) => {
    let accessToken = localStorage.getItem('access_token')

    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        },
    })

    if (response.status !== 401) {
        return response
    }

    // Access token expired → refresh it
    accessToken = await refreshAccessToken()

    // Retry the original request
    response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        },
    })

    return response
}