FROM cgr.dev/chainguard/jre:latest@sha256:bee4641209b4837411a054ba7c754e127f7c5f48f13554476e6a9481ee44b55c

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
