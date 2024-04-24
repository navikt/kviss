FROM cgr.dev/chainguard/jre-lts:latest

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
