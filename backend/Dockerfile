FROM cgr.dev/chainguard/jre:latest@sha256:6207f817070fae80779cdcf5ab3d24880e8c4fe19a31af24b3b5e850eda3d80e

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
