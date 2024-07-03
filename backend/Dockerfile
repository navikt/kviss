FROM cgr.dev/chainguard/jre-lts:latest@sha256:79c171abad0ad4e030f38fd32cecdeb4a8342f40ad14e85d584296e5349bd423

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
