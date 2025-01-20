FROM cgr.dev/chainguard/jre:latest@sha256:368a58cb41cef2b65a804dd01296f34625a7c63de4ce6557d8af79a0e91cc0e7

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
