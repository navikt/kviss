FROM cgr.dev/chainguard/jre-lts:latest@sha256:8df10d771f40c0a3ddbbe72d19842d2a119b1d943e169f476d234c9c7ec28c17

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
