FROM cgr.dev/chainguard/jre:latest@sha256:066074f614453b24385e83c403cfebe49ccfe248a057f18dca5d7b40552b6110

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
