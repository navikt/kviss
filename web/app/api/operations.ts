export const fetcher = async (url: string) => {
    await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res: Response) => {
            return res.json()
        })
        .catch((error: Error) => {
            throw error
        })
}
