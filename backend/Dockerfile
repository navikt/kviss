FROM cgr.dev/chainguard/jre:latest@sha256:6a20031eae40ce920143d21d8a4374f6a871000df6d53a6b34a063f0c8e29ccd

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
