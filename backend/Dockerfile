FROM cgr.dev/chainguard/jre:latest@sha256:35d1b3de452c4e784a5158d94fe7d353cc6fa08d8e7de01bc502e13dab3779d6

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
