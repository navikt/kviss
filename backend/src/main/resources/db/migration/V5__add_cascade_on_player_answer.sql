alter table player_answer
drop constraint player_answer_game_id_fk,
add constraint player_answer_game_id_fk
   foreign key (game_id)
   references game(id)
   on delete cascade;