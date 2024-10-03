FROM cgr.dev/chainguard/jre:latest@sha256:db9af34e305842dc9a015e54e8e92b8e2ffc3f486182cec6300ba5608482b962

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
