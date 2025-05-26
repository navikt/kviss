FROM cgr.dev/chainguard/jre:latest@sha256:77e8a18979e3164bbd7dac1fa51221664d9a6499e6487639f4ebf851725568e0

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
