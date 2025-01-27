FROM cgr.dev/chainguard/jre:latest@sha256:32f8e50d107dfb0a572a50b8fa57ce93505c94bf85bb15288ef72999ef0ea5b2

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
