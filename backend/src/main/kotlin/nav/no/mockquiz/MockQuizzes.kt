import nav.no.models.Alternative
import nav.no.models.Question
import nav.no.models.Quiz

val quiz = Quiz(
    "test quiz",
    1,
    "test description",
    listOf(
        Question(
            1,
            "Spørsmål 1",
            listOf(
                Alternative(1, "Alternative 1", true),
                Alternative(2, "Alternative 2", false),
                Alternative(3, "Alternative 3", false),
                Alternative(4, "Alternative 4", false),
            ),
            1,
            11
        ),
        Question(
            2,
            "Spørsmål 2",
            listOf(
                Alternative(5, "Alternative 1", true),
                Alternative(6, "Alternative 2", false),
                Alternative(7, "Alternative 3", false),
                Alternative(8, "Alternative 4", false),
            ),
            1,
            2
        ),
        Question(
            3,
            "Spørsmål 3",
            listOf(
                Alternative(9, "Alternative 1", true),
                Alternative(10, "Alternative 2", false),
                Alternative(11, "Alternative 3", false),
                Alternative(12, "Alternative 4", false),
            ),
            1,
            3
        ),
        Question(
            4,
            "Spørsmål 4",
            listOf(
                Alternative(13, "Alternative 1", true),
                Alternative(14, "Alternative 2", false),
                Alternative(15, "Alternative 3", false),
                Alternative(16, "Alternative 4", false),
            ),
            1,
            4
        )
    ), false
)

//Taken from NRK quiz site:
//https://www.nrk.no/nordland/quiz-om-lofoten_-torrfisk_-kultur-i-lofoten-og-geografi-i-lofoten-1.16007384

val lofotenQuiz = Quiz(
    "Lofoten",
    2,
    "Quiz om Lofoten",
    listOf(
        Question(
            5,
            "Lofoten er et kjent navn i hele verden. Men hva betyr egentlig Lofoten?",
            listOf(
                Alternative(17, "Foten til Vesterålen (Tidligere kalt Lo)", false),
                Alternative(18, "Gaupefot", true),
                Alternative(19, "Reinmule", false),
                Alternative(20, "Støvel eller sko", false),
            ),
            2,
            1
        ),
        Question(
            6,
            "Lofoten er et øyrike satt sammen av flere øyer. De største er Austvågøya, Gimsøya, Vestvågøya, " +
                    "Flakstadøya, Moskenesøya, Værøya og Røstlandet. Men hvor mange kommuner er det?",
            listOf(
                Alternative(21, "6", true),
                Alternative(22, "8", false),
                Alternative(23, "7", false),
                Alternative(24, "10", false),
            ),
            2,
            2
        ),
        Question(
            7,
            "Fjellene i Lofoten er det første du ser når du kommer. Men hvor gamle er de egentlig?",
            listOf(
                Alternative(25, "400 millioner år gamle", false),
                Alternative(26, "2,7 millioner år gamle", false),
                Alternative(27, "2,7 milliarder år gamle", false),
                Alternative(28, "3,5 milliarder år gamle", true),
            ),
            2,
            3
        ),
        Question(
            8,
            "Floraen i Lofoten er også veldig gammel. Finnes det planter i Lofoten som har overlevd istiden?",
            listOf(
                Alternative(29, "Ja", true),
                Alternative(30, "Nei", false),
            ),
            2,
            4
        ),
        Question(
            9,
            "Lofoten blir ofte omtalt i sammenheng med Vesterålen, som er nærmeste nabo. Hvilken fjord er det" +
                    " både Lofoten og Vesterålen har lyst til å kalle sin.",
            listOf(
                Alternative(31, "Vestfjorden", false),
                Alternative(32, "Kjerkfjorden", false),
                Alternative(33, "Trollfjorden", true),
                Alternative(34, "Bunesfjorden", false)
            ),
            2,
            5
        ),
        Question(
            10,
            "Tørrfisken er en av grunnene til at Lofoten ble satt på kartet. " +
                    "Men hvem er det som importerer mesteparten av tørrfisken fra Lofoten?",
            listOf(
                Alternative(35, "USA, Norge og Italia", false),
                Alternative(36, "Italia, Kroatia og Nigeria", true),
                Alternative(37, "Italia, Frankrike og USA", false),
                Alternative(38, "Kroatia, USA og Frankrike", false)
            ),
            2,
            6
        )
    ), false
)


// Source: britannica

val worldCupQuiz = Quiz(
    "FIFA MEN’S WORLD CUP QUIZ",
    3,
    "Quiz about mens world cup",
    listOf(
        Question(
            11,
            "Which country has won the most World Cups?",
            listOf(
                Alternative(39, "Brazil", true),
                Alternative(40, "Italy", false),
                Alternative(41, "Germany", false),
                Alternative(42, "Argentina", false),
            ),
            3,
            1
        ),
        Question(
            12,
            "What’s the host country for the 2022 World Cup?",
            listOf(
                Alternative(43, "England", false),
                Alternative(44, "Mexico", false),
                Alternative(45, "Qatar", true),
                Alternative(46, "Japan", false),
            ),
            3,
            2
        ),
        Question(
            13,
            "How many national teams compete in the World Cup?",
            listOf(
                Alternative(47, "32", true),
                Alternative(48, "2", false),
                Alternative(49, "16", false),
                Alternative(50, "64", false),
            ),
            3,
            3
        ),
        Question(
            14,
            "Which country won the World Cup in 2018?\n",
            listOf(
                Alternative(51, "Croatia", false),
                Alternative(52, "France", true),
                Alternative(53, "United States", false),
                Alternative(54, "South Korea", false),
            ),
            3,
            4
        ),
        Question(
            15,
            "Prior to the 2022 World Cup, which player " +
                    "is the all-time leading goal scorer in World Cup history?",
            listOf(
                Alternative(55, "Lionel Messi", false),
                Alternative(56, "Ronaldo (Brazil)", false),
                Alternative(57, "Pelé", false),
                Alternative(58, "Miroslav Klose", true)
            ),
            3,
            5
        ),
        Question(
            16,
            "What year did the World Cup competition start?",
            listOf(
                Alternative(59, "1890", false),
                Alternative(60, "1925", false),
                Alternative(61, "1950", false),
                Alternative(62, "1930", true)
            ),
            3,
            6
        ),
        Question(
            17,
            "Prior to the 2022 World Cup, which goalkeeper has the most saves in a single World Cup match?",
            listOf(
                Alternative(63, "Lev Yashin", false),
                Alternative(64, "Manuel Neuer", false),
                Alternative(65, "Gianluigi Buffon", false),
                Alternative(66, "Tim Howard", true)
            ),
            3,
            7
        ),
        Question(
            18,
            "What is the name of Diego Maradona’s infamous first goal against England in 1986?",
            listOf(
                Alternative(67, "Hand of God", true),
                Alternative(68, "The Scorpion", false),
                Alternative(69, "Maradona Miracle", false),
                Alternative(70, "It doesn’t have a name.", false)
            ),
            3,
            8
        ),
        Question(
            19,
            "In 2010, which one of these teams was not in the semifinals?",
            listOf(
                Alternative(71, "Netherlands", false),
                Alternative(72, "England", true),
                Alternative(73, "Spain", false),
                Alternative(74, "Uruguay", false)
            ),
            3,
            9
        ),
        Question(
            20,
            "How often does the World Cup take place?",
            listOf(
                Alternative(75, "Every two years", false),
                Alternative(76, "Every year", false),
                Alternative(77, "Every four years", false),
                Alternative(78, "Twice a year", true)
            ),
            3,
            10
        )
    ), false
)