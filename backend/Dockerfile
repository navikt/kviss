FROM cgr.dev/chainguard/jre:latest@sha256:aa4755219e252f60b235a82ce0421fdb0e0ee864b5f064f30df92c9c9bcd3f16

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
