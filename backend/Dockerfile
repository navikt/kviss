FROM cgr.dev/chainguard/jre:latest@sha256:fa102cce5eabeb036fd6847b62bd91f8eef20bba44c9afdbd90e4ba0cd37e8f8

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
