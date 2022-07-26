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
        ENV: {
            API_URL: process.env.API_URL
        }
    })
}

export default function App() {
    const envData = useLoaderData()
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
                    <script 
                        dangerouslySetInnerHTML={{
                            __html: `window.ENV = ${JSON.stringify(
                                envData.ENV
                            )}`
                        }}
                    />
                    <Scripts />
                    <LiveReload />
                </GameProvider>
            </body>
        </html>
    )
}
