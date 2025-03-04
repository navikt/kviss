FROM cgr.dev/chainguard/jre:latest@sha256:b2bd93184e8c7190cb4c0587165fcfd95de4f3119dca93b6bef25eefbfd01b92

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
