FROM cgr.dev/chainguard/jre:latest@sha256:3cf43760184d26aa985ff4e8020353533b75b940ac10f7e74245c2dcdef30be0

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
