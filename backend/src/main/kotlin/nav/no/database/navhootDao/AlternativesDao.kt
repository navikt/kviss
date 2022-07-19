package nav.no.database.navhootDao

import nav.no.database.navhootDao.QueriesAlternatives.SELECT_ALTERNATIVE
import nav.no.database.navhootDao.QueriesAlternatives.SELECT_ALTERNATIVES
import nav.no.database.toList
import nav.no.database.domain.Alternative
import javax.sql.DataSource

class AlternativesDao(
    private val dataSource: DataSource,
) {

    fun getAlternatives(questionId: Long): List<Alternative> {

        dataSource.connection.use {
            return it.prepareStatement(SELECT_ALTERNATIVES)
                .apply {
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

    fun getAlternative(id: Long): Alternative {
        dataSource.connection.use {
        
            val rs = it.prepareStatement(SELECT_ALTERNATIVE).apply {
                setLong(1, id)
            }.executeQuery()
            return if (rs.next()) {
                Alternative(
                    rs.getLong("id"),
                    rs.getString("description"),
                    rs.getBoolean("is_correct")
                )
            } else {
                throw Exception("The alternative does not exist")
            }
        }
    }
}

private object QueriesAlternatives {

    val SELECT_ALTERNATIVES = """
        select * 
        from alternative
        where question_id = ?;
    """.trimIndent()

    val SELECT_ALTERNATIVE = """
        select * 
        from alternative
        where id = ?;
    """.trimIndent()

    val INSERT_ALTERNATIVE = """
        INSERT INTO alternative(question_id, description, is_correct)
        VALUES (?, ?, ?)
        RETURNING id;
    """.trimIndent()

    val DELETE_ALTERNATIVE = """
        DELETE FROM alternative WHERE id = ?;
    """.trimIndent()
}