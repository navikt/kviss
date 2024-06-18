FROM cgr.dev/chainguard/jre-lts:latest@sha256:7cea3271837d93cedd2fcc73ea189dd9ce13a40064c212a67de62e53670a71c2

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
