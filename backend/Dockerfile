FROM cgr.dev/chainguard/jre:latest@sha256:9772d56fadfb3c6513c597a6aef52687dac70fc69f70e5d87b1e9b190ffb46b5

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
