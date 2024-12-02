FROM cgr.dev/chainguard/jre:latest@sha256:6df6d6359727dbbd146829dd01ab88221f6de11c923baf9fd9b262617736b7d7

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
