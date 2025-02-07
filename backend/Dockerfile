FROM cgr.dev/chainguard/jre:latest@sha256:17b185eb4e0987d4362facd746affcffd03b136fb42823089e55508ba79e32b4

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
