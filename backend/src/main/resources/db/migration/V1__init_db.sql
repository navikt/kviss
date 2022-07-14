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
    description text,
    is_draft    bool
);
create table question
(
    id          bigserial
        constraint question_pk
            primary key,
    description text,
    quiz_id     bigint not null
        constraint question_quiz_id_fk
            references quiz,
    sort_order     int
);
create table alternative
(
    id bigserial
        constraint alternative_pk
            primary key,
    question_id bigint
        constraint alternative_question_id_fk
            references question,
    description text,
    is_correct  bool
);
create table game
(
    id         bigserial
        constraint game_pk
            primary key,
    quiz_id    bigint
        constraint game_quiz_id_fk
            references quiz,
    game_id    int,
    is_active  bool
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
)