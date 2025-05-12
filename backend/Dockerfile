FROM cgr.dev/chainguard/jre:latest@sha256:81bd9df8030d2ec70c4d464ab87417c034023d85c425943fd5772fb63cd9be0a

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
