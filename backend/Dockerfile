FROM cgr.dev/chainguard/jre-lts:latest@sha256:ae5f009c0d68de74dc6c47d285949a2bdb0f3b0e6fdcbad849189bc0fefdf3d8

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
