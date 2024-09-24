FROM cgr.dev/chainguard/jre:latest@sha256:0e565c61d88a42dc69bd9687454931bf0b0e481bf6eeadcd432e69cab15f0873

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
