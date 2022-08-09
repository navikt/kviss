alter table game
drop constraint game_quiz_id_fk,
add constraint game_quiz_id_fk
   foreign key (quiz_id)
   references quiz(id)
   on delete cascade;
