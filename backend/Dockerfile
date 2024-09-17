FROM cgr.dev/chainguard/jre:latest@sha256:fc8f1ccf05abe7802060a5dea58233cea3e7f455cbf0b094292d3929bec91952

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
