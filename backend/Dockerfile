FROM cgr.dev/chainguard/jre:latest@sha256:6d451110703b1b80e7451de80b8b7a4f210a8c08725cb891bd016592c59dadc7

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
