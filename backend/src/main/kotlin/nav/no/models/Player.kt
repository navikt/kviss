import kotlinx.serialization.Serializable

@Serializable
class Player(val name: String, var score: Int = 0)