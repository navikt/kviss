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
