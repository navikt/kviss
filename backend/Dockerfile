FROM cgr.dev/chainguard/jre-lts:latest@sha256:df4061d17757ed4d652e43d1599544975f356eb73e58011f56d9402293bcf172

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
