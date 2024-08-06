FROM cgr.dev/chainguard/jre-lts:latest@sha256:070c0b5720797dab500335f8cb56b68ae529dee5329f7d6aba81843fe11e8f42

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
