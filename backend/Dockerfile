FROM cgr.dev/chainguard/jre:latest@sha256:8a4d83302b03f4fb15ca670ec83dac22d6e6c138c51a832ebf76c224855e22fb

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
