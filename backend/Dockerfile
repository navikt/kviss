FROM cgr.dev/chainguard/jre:latest@sha256:70b896eb3c58aa7465ee541ca81cc209363ae012d77ae4f4d328ce944933a108

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
