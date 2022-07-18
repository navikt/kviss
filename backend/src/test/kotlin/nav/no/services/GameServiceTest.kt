package nav.no.services

import io.mockk.*
import nav.no.database.navhootDao.AlternativesDao
import nav.no.database.navhootDao.GameDao
import nav.no.database.navhootDao.PlayerDao
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.fail

internal class GameServiceTest {

    private val alternativesDao = mockk<AlternativesDao>()
    private val playerDao = mockk<PlayerDao>()
    private val gamedao = mockk<GameDao>()

    private val service = GameService(alternativesDao, playerDao, gamedao)

    @AfterEach
    fun afterEach(){
        clearAllMocks()
    }

    @Test
    fun `No result in database`() {
        every { gamedao.getGamePin(any()) } returns null

        service.createGamePin()

        verify(exactly = 1) { gamedao.getGamePin(any()) }
    }

    @Test
    fun `exception after three tries`() {
        every { gamedao.getGamePin(any()) } returns 1
        every { gamedao.getGamePin(any()) } returns 2
        every { gamedao.getGamePin(any()) } returns 3

        try {
            service.createGamePin()
            Assertions.fail()
        } catch (e: Exception) {

        }

        verify(exactly = 3) { gamedao.getGamePin(any()) }
    }

    @Test
    fun `match on first`() {
        every { gamedao.getGamePin(any()) } returns 12345
        every { gamedao.getGamePin(any()) } returns null

        service.createGamePin()


        verify(exactly = 2) { gamedao.getGamePin(any()) }
    }

}