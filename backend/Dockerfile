FROM cgr.dev/chainguard/jre:latest@sha256:902d7be7006ec26eb95632d3f1940f6088cf9017499c25f93f9124de08e7b774

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
