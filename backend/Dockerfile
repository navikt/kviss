FROM cgr.dev/chainguard/jre:latest@sha256:fba813a1a91ce642ce87515ea6603fa3255cd6732c9faef014b696ab358222df

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
