FROM cgr.dev/chainguard/jre:latest@sha256:db585b86887f21a6811810374303c14cadb63dde55ae6f3905a9bf3f4f29b3b4

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
