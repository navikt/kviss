FROM cgr.dev/chainguard/jre:latest@sha256:1ac7a1706dda39af103165eb55ced55d550a6a630a2222657d098b7ba7a66630

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
