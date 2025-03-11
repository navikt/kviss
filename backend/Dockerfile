FROM cgr.dev/chainguard/jre:latest@sha256:414462ee6486b69ecaf4faa2dab9c3911afb44a2af6fdc0ac4c32912ec3e535c

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
