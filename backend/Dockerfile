FROM cgr.dev/chainguard/jre:latest@sha256:53fd15a02d3dd1a4f0feae886fa59f6808732ad85e4dfadfd1480a6f09459087

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
