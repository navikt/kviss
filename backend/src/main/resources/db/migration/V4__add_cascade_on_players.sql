alter table player
drop constraint player_game_id_fk,
add constraint player_game_id_fk
   foreign key (game_id)
   references game(id)
   on delete cascade;