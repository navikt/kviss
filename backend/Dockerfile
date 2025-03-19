FROM cgr.dev/chainguard/jre:latest@sha256:47f8c0e6c2ef7ec671509baccdfde936d67311d7c91b460ea51b2856ddbb2beb

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
