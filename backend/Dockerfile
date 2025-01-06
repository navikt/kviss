FROM cgr.dev/chainguard/jre:latest@sha256:9da3caa00032e568be23e43d932a45518456416082beaec3f6b83b13be1833df

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
