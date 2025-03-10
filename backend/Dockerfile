FROM cgr.dev/chainguard/jre:latest@sha256:41f4b6ad9115bfca8f6ac6adf8d1adf729fab3bffe3cb51e89799f14fd9eaca7

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
