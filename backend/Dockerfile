FROM cgr.dev/chainguard/jre:latest@sha256:486d71129986c843131ef10b9a236a321ef6620a3df6d0126741d20fb5ac6a1f

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
