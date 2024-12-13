FROM cgr.dev/chainguard/jre:latest@sha256:884734296d37d174292312c5a372404a9327c7264b3f1b401538fd37312be832

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
