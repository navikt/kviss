FROM cgr.dev/chainguard/jre:latest@sha256:e5cbd76ccec16911385c176ba00feb5455641addb6bea81823df8cd2d0c81519

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
