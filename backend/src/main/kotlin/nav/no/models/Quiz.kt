package nav.no.models

import Player
import Question
import java.util.UUID
import kotlinx.serialization.Serializable

@Serializable
class Quiz (var name: String, val creator: Player?){  // TODO: Change player to user once that is implemented
    init {
        val UUID = UUID.randomUUID().toString()
    }
    var questions = mutableListOf<Question>()
    var description = String()

    fun changeDescription(desc: String) {
        description = desc
    }

    fun addQuestion(question: Question) {
        if(questions.contains(question)) {
            throw IllegalArgumentException("Question already in quiz!")
        }else {
            questions.add(question)
        }
    }
    fun removeQuestion(question: Question){
        if(questions.contains(question)) {
            questions.remove(question)
        } else {
            throw IllegalArgumentException("Question does not exist in quiz")
        }
    }
}