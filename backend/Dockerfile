FROM cgr.dev/chainguard/jre-lts:latest@sha256:33f7571e0b3688041bfa9d78bc57e242c9d560fb886c0aec60b0994ceae4bcea

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
