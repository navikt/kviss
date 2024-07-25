FROM cgr.dev/chainguard/jre-lts:latest@sha256:2bfa52ee2d206a4579177754712455484456a95e8984702bad06094975b9e747

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
