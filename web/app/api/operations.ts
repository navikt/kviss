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

export const poster = async <T>(url: string, data: T): Promise<{ data: T | undefined; error: Error | undefined }> => {
    let resData: T | undefined = undefined
    let resError: Error | undefined = undefined

    await fetch(url, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res: Response) => {
            resData = res.json() as unknown as T
            resError = undefined
        })
        .catch((error: Error) => {
            resData = undefined
            resError = error
        })

    return { data: resData, error: resError }
}
