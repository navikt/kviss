FROM cgr.dev/chainguard/jre:latest@sha256:64ded655402c4dece300b8da90b58fb307db36d9e169f27fe192cf9f4505dfcd

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
