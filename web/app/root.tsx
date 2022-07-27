import { json, MetaFunction } from '@remix-run/node'
import styles from './styles/app.css'

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import Header from './components/Header'
import Footer from './components/Footer'
import { GameProvider } from './context/game/GameContext'

export function links() {
    return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'kviss',
    viewport: 'width=device-width,initial-scale=1',
})

export async function loader() {
    return json({
        env: {
            API_URL: process.env.API_URL || 'localhost:8080',
            WS_URL: process.env.WS_URL || 'ws://localhost:8080',
        },
    })
}

export default function App() {
    const data = useLoaderData()

    return (
        <html lang="en" className={'h-screen dark'}>
            <head>
                <Meta />
                <Links />
            </head>
            <body className="bg-slate-800 flex flex-col h-screen justify-between">
                <GameProvider>
                    <Header />
                    <div className={'container mx-auto'}>
                        <Outlet />
                    </div>
                    <Footer />
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </GameProvider>

                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.env = ${JSON.stringify(
                            data.env
                        )}`,
                    }}
                />
            </body>
        </html>
    )
}
