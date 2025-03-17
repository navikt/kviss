FROM cgr.dev/chainguard/jre:latest@sha256:45884a5aba8fd00989f7ce1eca4bc021f5f2dca1556f0c39bba63160bb9ad868

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
