FROM cgr.dev/chainguard/jre:latest@sha256:681b668ac517d97181574178d56909f0f356b440df46a94ee423dfd87146d0e8

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
