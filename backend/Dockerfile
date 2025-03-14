FROM cgr.dev/chainguard/jre:latest@sha256:6b48f0d39851e56c459da4977aa76ffbf8f143c9d9eab91231cfa5f24a4f2990

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
