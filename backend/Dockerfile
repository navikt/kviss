FROM cgr.dev/chainguard/jre-lts:latest@sha256:5bd6edc3bc8f609ed3f9ff9cd071c272423af2ab68010a764a90f7e3e629fca4

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
