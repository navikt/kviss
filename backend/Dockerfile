FROM cgr.dev/chainguard/jre:latest@sha256:948bc56bf5f972e1f3f02473d6fb228222f2dacec5d0ee0a5debce7a1868c344

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
