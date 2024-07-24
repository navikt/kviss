FROM cgr.dev/chainguard/jre-lts:latest@sha256:5c5bcf1dbcde1b247de65baa9947a8afaa773b6f338b401016d90391d8f5f3cb

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
