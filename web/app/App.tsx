import Header from './components/Header'
import Footer from './components/Footer'
import { GameProvider } from './context/game/GameContext'
import { Route, Routes } from 'react-router-dom'
import FrontPage from './routes/index'
import CreateQuiz from './routes/create'
import EditQuizView from './routes/edit/$quizId'
import StartQuizView from './routes/start'
import GameView from './routes/game'
import LobbyView from './routes/game/index'
import HostView from './routes/game/lobby/host'
import JoinQuiz from './routes/join'

export default function App() {
    return (
        <GameProvider>
            <Header/>

            <Routes>
                <Route index element={<FrontPage />} />
                <Route path={'create'} element={<CreateQuiz />} />
                <Route path={'start'} element={<StartQuizView />} />
                <Route path={'join'} element={<JoinQuiz />} />
                <Route path={'edit/:quizId'} element={<EditQuizView />} />
                <Route path={'game'} element={<GameView />} >
                    <Route index element={<LobbyView />} />
                    <Route path={'lobby/host'} element={<HostView />} />
                </Route>

                <Route path={'*'} element={(
                    <h1 className="text-3xl text-center mb-4 text-white">
                        404 not found
                    </h1>
                )} />
            </Routes>

            <Footer/>
        </GameProvider>
    )
}
