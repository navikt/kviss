FROM cgr.dev/chainguard/jre:latest@sha256:94a493cc82a0439078f11aab375b0320df6104cd716ab765e979d77b4c61b24b

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
