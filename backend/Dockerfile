FROM cgr.dev/chainguard/jre-lts:latest@sha256:8e3ad0f5115c4d6606760c5eb9a7e2f1e8981b7c7e2b86e223bbf243c9621ec9

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
