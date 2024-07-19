FROM cgr.dev/chainguard/jre-lts:latest@sha256:3dc6fee0af7130513ae878339e57b05ef0b932272c604c299527db68186ee8f2

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
