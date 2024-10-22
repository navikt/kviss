FROM cgr.dev/chainguard/jre:latest@sha256:43afe3cb7331f517eff19667939fb84c1e7aed283608e752007cfbbf9b4252d1

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
