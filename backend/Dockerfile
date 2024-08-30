FROM cgr.dev/chainguard/jre:latest@sha256:f7583ba4addcfd8d6d4a4a916bdc8a1ed83603555b3a85daf19334909d8bb57e

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
