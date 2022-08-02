import { useNavigate } from '@remix-run/react'
import Button from '~/components/common/Button'

export default function Index() {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center flex-col">
            <h1 className="text-3xl text-center mb-4 text-white">
                Welcome to kviss! A application that solves all your quizzzing needs at NAV
            </h1>
            <Button onClick={() => navigate('./join')}>
                <p className="text-2xl w-52">Join quiz</p>
            </Button>
            <Button onClick={() => navigate('./start')}>
                <p className="text-2xl w-52">Start quiz</p>
            </Button>
            <Button onClick={() => navigate('./create')}>
                <p className="text-2xl w-52">Create quiz</p>
            </Button>
        </div>
    )
}
