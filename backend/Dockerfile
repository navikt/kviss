FROM cgr.dev/chainguard/jre:latest@sha256:803b651145a3d287d9b35f1091239e16c014ce53d20915ac81d0a9dcd459d43b

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
