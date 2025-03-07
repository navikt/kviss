FROM cgr.dev/chainguard/jre:latest@sha256:42caea51e5302dc78a7d7405e8a75e289b49bd1a09b227724a72cc26ab4b0e9e

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
