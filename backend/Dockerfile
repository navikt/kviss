FROM cgr.dev/chainguard/jre-lts:latest@sha256:cdda79985031478a0e7c89892c7889fa80cb981b084ad50f1d6dd4bd007097c3

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
