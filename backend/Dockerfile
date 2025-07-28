FROM cgr.dev/chainguard/jre:latest@sha256:9b76380d3faecf083648120f33e38e1bb98195419bc6acf4e3f10ca854e2c4f3

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
