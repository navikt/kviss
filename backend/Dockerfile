FROM cgr.dev/chainguard/jre:latest@sha256:7e41bce32d4b84326942074c3ccbde1104cfb91c11a53ed0453361e88e56dcee

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
