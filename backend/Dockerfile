FROM cgr.dev/chainguard/jre:latest@sha256:00b369f6098c28d2eebdbf604fc7ff45700c65194b2def484f0683bc12d75ceb

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
