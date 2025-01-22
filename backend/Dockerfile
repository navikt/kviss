FROM cgr.dev/chainguard/jre:latest@sha256:2abd20cb23a6b31abccb5943a21bfadbd7a612981ab4943d02e34112faca1615

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
