FROM cgr.dev/chainguard/jre-lts:latest@sha256:66c2d18fb66b85142413283045d72bc50638fbc73f596416d0bb5eb0169d8f1f

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
