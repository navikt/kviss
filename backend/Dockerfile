FROM cgr.dev/chainguard/jre:latest@sha256:da81b384313d967e65ad42bdcd6730878d0b60f280e879aa34ee2abe2537f246

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
