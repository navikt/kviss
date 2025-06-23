FROM cgr.dev/chainguard/jre:latest@sha256:c3e04cab8dfed37b4bed42e36067aec6301da6eadeac4b2437e56ab3addae102

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
