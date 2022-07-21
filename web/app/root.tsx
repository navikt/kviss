import type { MetaFunction } from '@remix-run/node'
import styles from './styles/app.css'

import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react'
import Header from './components/Header'
import Footer from './components/Footer'
import QuizProvider from './context/QuizContext'

export function links() {
    return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'NavHoot',
    viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="bg-orange-100">
                <QuizProvider>
                    {/** TODO: Add the implementation of header and footer */}
                    <Header />
                    <Outlet />
                    {/* <Footer /> */}
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </QuizProvider>
            </body>
        </html>
    )
}
