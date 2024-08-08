FROM cgr.dev/chainguard/jre-lts:latest@sha256:1520f9390fd35aea27cc1b407f3a03899e3a2b213bd066550a32cba2fac8f3ee

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
