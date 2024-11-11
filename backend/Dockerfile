FROM cgr.dev/chainguard/jre:latest@sha256:aa682b2987dd23777ddbac2ab22a1413e3085182d08d6fc8212566856cce1982

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
