FROM cgr.dev/chainguard/jre:latest@sha256:811852fc1f845fc5d04543c5ad03677fe192b6823b2a64d5cbf1451a644eb0c1

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
