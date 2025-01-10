FROM cgr.dev/chainguard/jre:latest@sha256:7a63ab17be4f85821cedb56a57ae71adf4e5f93142f45171983b69b4e245cd0b

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
