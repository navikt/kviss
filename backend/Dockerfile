FROM cgr.dev/chainguard/jre:latest@sha256:a6aff0af8fd0a45f06aad3e3f075e71a726b13256ea3b588f274506d05100244

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
