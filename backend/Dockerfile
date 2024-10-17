FROM cgr.dev/chainguard/jre:latest@sha256:16a5022946e7643ab72879c7a58bb3038acee0d3ca09ab25783e5a8b857ee9e2

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
