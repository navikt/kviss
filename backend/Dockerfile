FROM cgr.dev/chainguard/jre:latest@sha256:5a31ca3b31fb87f51d51a2484a420752b7a8c743d4aa0061412f909e3785d873

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
