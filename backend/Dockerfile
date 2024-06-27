FROM cgr.dev/chainguard/jre-lts:latest@sha256:612e3737523e94dd6ea6c5d6e0967386d96cac9199a5292cb3779d58d7419d86

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
