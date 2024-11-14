FROM cgr.dev/chainguard/jre:latest@sha256:49dc9ce0548430570f3e40f627482fc8a785ff3a5009c414fa41826a1f45c34a

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
