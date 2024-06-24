FROM cgr.dev/chainguard/jre-lts:latest@sha256:93c20c741698535d9c67c4b546499232af021083cdfc93260eb58748aeda1024

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
