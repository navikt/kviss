
------------
-- QUIZ 1 --
------------
INSERT INTO public.quiz (name, description)
VALUES ('Hva kan du om Norge?', 'Quiz med spørsmål om vårt kjære fedreland');

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'Hva heter norges lengste elv?', 1);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Glomma', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Tana', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Drammenselva', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Trysilelva', false);


-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'Hvem av disse er IKKE en av de fire store', 2);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Bjørnar', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Ibsen', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Kielland', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Lie', false);


-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'Hva heter Munch til fornavn?', 3);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Edvard', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Eilert', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Espen', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Egil', false);


------------
-- QUIZ 2 --
------------
INSERT INTO public.quiz (name, description)
VALUES ('Fredagsquiz', 'En liten fredagsquiz før helgen');

INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), null, 1);


------------
-- QUIZ 3 --
------------
INSERT INTO public.quiz (name, description)
VALUES ('test quiz', null);


------------
-- QUIZ 4 --
------------
INSERT INTO public.quiz (name, description)
VALUES ('FYA1', 'Spørsmål om FYA1');

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'Er det lov til å ta med mat opp fra kantina?', 1);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Ja', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Nei', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Kanskje', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Vet ikke', false);



------------
-- QUIZ 5 --
------------
INSERT INTO public.quiz (name, description)
VALUES ('Lofoten', 'Quiz om Lofoten');

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'Lofoten er et kjent navn i hele verden. Men hva betyr egentlig Lofoten?', 1);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Foten til Vesterålen (Tidligere kalt Lo)', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Gaupefot', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Reinmule', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Støvel eller sko', false);

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'Lofoten er et øyrike satt sammen av flere øyer. De største er Austvågøya, Gimsøya, Vestvågøya, ' ||
                                    'Flakstadøya, Moskenesøya, Værøya og Røstlandet. Men hvor mange kommuner er det?', 2);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '6', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '8', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '7', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '10', false);

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'Fjellene i Lofoten er det første du ser når du kommer. Men hvor gamle er de egentlig?', 3);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '400 millioner år gamle', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '2,7 millioner år gamle', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '2,7 milliarder år gamle', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '3,5 milliarder år gamle', true);

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'Lofoten blir ofte omtalt i sammenheng med Vesterålen, som er nærmeste nabo. Hvilken fjord er det både ' ||
                                    'Lofoten og Vesterålen har lyst til å kalle sin.', 4);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Vestfjorden', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Kjerkfjorden', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Trollfjorden', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Bunesfjorden', false);

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'Tørrfisken er en av grunnene til at Lofoten ble satt på kartet. Men hvem er det som importerer ' ||
                                    'mesteparten av tørrfisken fra Lofoten?', 5);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'USA, Norge og Italia', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Italia, Kroatia og Nigeria', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Italia, Frankrike og USA', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Kroatia, USA og Frankrike', false);



------------
-- QUIZ 6 --
------------
INSERT INTO public.quiz (name, description)
VALUES ('Fifa men’s world cup quiz', 'Quiz about mens world cup');

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'Which country has won the most World Cups?', 1);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Brazil', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Italy', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Germany', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Argentina', false);

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'What’s the host country for the 2022 World Cup?', 2);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'England', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Mexico', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Qatar', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Japan', false);

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'How many national teams compete in the World Cup?', 3);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '32', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '2', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '16', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '64', false);

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'Which country won the World Cup in 2018?', 4);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Croatia', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'France', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'United States', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'South Korea', false);

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'Prior to the 2022 World Cup, which player is the all-time leading goal scorer in World Cup history?', 5);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Lionel Messi', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Ronaldo (Brazil)', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Pelé', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Miroslav Klose', true);

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'What year did the World Cup competition start?', 6);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '1890', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '1925', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '1950', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), '1930', true);

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'Prior to the 2022 World Cup, which goalkeeper has the most saves in a single World Cup match?', 7);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Lev Yashin', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Manuel Neuer', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Gianluigi Buffon', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Tim Howard', true);

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'What is the name of Diego Maradona’s infamous first goal against England in 1986?', 8);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Hand of God', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'The Scorpion', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Maradona Miracle', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'It doesn’t have a name.', false);

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'In 2010, which one of these teams was not in the semifinals?', 9);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Netherlands', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'England', true);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Spain', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Uruguay', false);

-- NEXT QUESTION
INSERT INTO public.question (quiz_id, description, sort_order)
VALUES ((SELECT max(id) FROM quiz), 'How often does the World Cup take place?', 10);

INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Every two years', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Every year', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Every four years', false);
INSERT INTO public.alternative (question_id, description, is_correct)
VALUES ((SELECT max(id) FROM question), 'Twice a year', true);

