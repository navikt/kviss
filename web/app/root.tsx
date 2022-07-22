import type { MetaFunction } from '@remix-run/node'
import styles from './styles/app.css'

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import Header from './components/Header'
import Footer from './components/Footer'
import GameProvider from './context/GameContext'

export function links() {
    return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'kviss',
    viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
    return (
        <html lang="en" className={'h-screen dark'}>
            <head>
                <Meta />
                <Links />
            </head>
            <body className="bg-slate-800 flex flex-col h-screen justify-between">
                <GameProvider>
                    {/** TODO: Add the implementation of header and footer */}
                    <Header />

                    <div className={'container mx-auto'}>
                        <Outlet />
                    </div>

                    <Footer />

                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </GameProvider>
            </body>
        </html>
    )
}
