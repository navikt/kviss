FROM cgr.dev/chainguard/jre:latest@sha256:de3610dca3543f60ca9c0b98b9639676bd1eba62fd78d61ef203f84d96e8a9f2

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
