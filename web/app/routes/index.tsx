import { Outlet } from '@remix-run/react'
import Scoreboard from '~/components/Scoreboard'

export default function Index() {
    return (
        <>
            <Scoreboard />
            <Outlet />
        </>
    )
}
