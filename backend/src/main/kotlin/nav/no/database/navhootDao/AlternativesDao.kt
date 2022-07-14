package nav.no.database

import nav.no.database.QueriesAlternatives.SELECT_ALTERNATIVE
import nav.no.models.Alternative
import javax.sql.DataSource

class AlternativesDao(
    private val dataSource: DataSource,
) {

    fun getAlternatives(questionId: Long): List<Alternative> {
        return dataSource.connection.use {
            return it.prepareStatement(SELECT_ALTERNATIVE).apply {
                setLong(1, questionId)
            }.executeQuery().toList {
                Alternative(
                    getLong("id"),
                    getString("description"),
                    getBoolean("is_correct")
                )
            }
        }
    }
}


private object QueriesAlternatives {

    val SELECT_ALTERNATIVE = """
        select * 
        from alternative
        where question_id = ?;
    """.trimIndent()

}