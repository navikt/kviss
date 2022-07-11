import kotlinx.serialization.Serializable

@Serializable
class Question(val question: String, val alternatives: List<Alternative>){
    fun checkAlternative(alternative: Alternative): Boolean {
        return alternative.correct
    }
}

