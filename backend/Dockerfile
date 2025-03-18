FROM cgr.dev/chainguard/jre:latest@sha256:0260c1da079991a806cae6804e0c06ec5c0e9e8cc7d01b0298ce3eb90bae8ef2

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
