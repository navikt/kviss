# kviss backend

## Getting started

1. Build the project using `gradle build`
2. Setup database (read more below) and add env variables to run config.
3. Run `Application.kt`

### Local database

Environment variables needed to run the application locally will look something like this
(change according to your setup):

`DB_HOST=localhost;DB_PASSWORD=<password>;DB_PORT=5432;DB_USERNAME=<username>;DB_DATABASE=kviss;`

If you're not using the _default port_ `5432` you have to add `DB_PORT=<port>` to the variables above.

#### (Option 1) Postgres.app

[Postgres.app](https://postgresapp.com/) is a lightweight and full-featured PostgreSQL installation.

#### (Option 2) Docker postgres

**NOTE:** This requires a local Docker installation (e.g. Docker Desktop).

```shell
docker pull postgres
```

```shell
docker run \
    --name kviss \
    -e POSTGRES_PASSWORD=<password> \
    -p 5432:5432 \
    -d \
    --rm \
    postgres
```

Make sure you run `CREATE DATABASE kviss;` after setting up the container, as this is not done automatically.

#### (Option 3) nais-cli

It is also possible to connect to the dev database using [nais-cli](https://doc.nais.io/cli/).

Read the documentation here: \
https://doc.nais.io/cli/commands/postgres
