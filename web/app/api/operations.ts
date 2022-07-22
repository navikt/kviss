export const fetcher = async (url: string) =>
    await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    })
        .then((res: Response) => res.json())
        .catch((error: Error) => {
            throw error
        })

export const poster = async <T>(url: string, data: T) => {
    await fetch(url, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res: Response) => res.json())
        .catch((error: Error) => {
            throw error
        })
}
