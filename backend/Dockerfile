FROM cgr.dev/chainguard/jre:latest@sha256:609d523ac115a88fa2a705a3c690b5a12fa112e8c9d363ab2d20f592b4798422

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
