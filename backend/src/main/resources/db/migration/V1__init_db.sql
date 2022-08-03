DO
$$
    BEGIN
        IF EXISTS
            (select 1 from pg_roles where rolname = 'cloudsqliamuser')
        THEN
            grant all on all tables in schema public to cloudsqliamuser;
        END IF;
    END
$$;

create table quiz
(
    id          bigserial
        constraint quiz_pk
            primary key,
    name        text,
    description text
);

create unique index quiz_id_uindex on quiz (id);


create table question
(
    id          bigserial
        constraint question_pk
            primary key,
    description text,
    quiz_id     bigint not null
        constraint question_quiz_id_fk
            references quiz ON DELETE CASCADE,
    sort_order     int
);

create unique index question_id_uindex on question (id);

create table alternative
(
    id bigserial
        constraint alternative_pk
            primary key,
    question_id bigint
        constraint alternative_question_id_fk
            references question ON DELETE CASCADE,
    description text,
    is_correct  bool
);

create unique index alternative_id_uindex on alternative (id);


create table game
(
    id         bigserial
        constraint game_pk
            primary key,
    quiz_id    bigint
        constraint game_quiz_id_fk
            references quiz,
    pin    int,
    is_active  bool,
    host_id text
);
create table player
(
    id bigserial
        constraint player_pk
            primary key,
    name text,
    score int,
    game_id    bigint
        constraint player_game_id_fk
            references game
);

create table player_answer
(
    id            bigserial
        constraint player_answer_pk
            primary key,
    alternative_id   bigint
        constraint player_answer_alternative_id_fk
            references alternative,
    game_id   bigint
        constraint player_answer_game_id_fk
            references game,
    player_id     bigint
        constraint player_answer_player_id_fk
            references player,
    time_answered timestamp
);