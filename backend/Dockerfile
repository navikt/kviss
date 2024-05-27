FROM cgr.dev/chainguard/jre-lts:latest@sha256:28bb479573e468a9199346a132e57cc8c4b87b5c7fe6a01ca548f1674e7a77c8

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
