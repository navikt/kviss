FROM cgr.dev/chainguard/jre:latest@sha256:0e78f1a90d0e9791de69f554b7bc9d5b5d991bcb20751d08e2e010ed22775c67

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
