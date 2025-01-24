FROM cgr.dev/chainguard/jre:latest@sha256:f409c7a9dcd395cadf4de2a999169fe96ca27fa90fef794d0d6548ce399b773a

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
