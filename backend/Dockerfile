FROM cgr.dev/chainguard/jre:latest@sha256:cebc93bd1201ec56aa39a5688ae5dfa135fb9e08d4132ad5879e59b221f07a0a

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
