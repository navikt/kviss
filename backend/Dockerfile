FROM cgr.dev/chainguard/jre:latest@sha256:92373f234956b9c0f221c58937782a337590e443a05bbc727fb74c13a13a11b5

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
