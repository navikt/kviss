FROM cgr.dev/chainguard/jre:latest@sha256:a763a7bd32b31558163ed0a9fce100c1eb6eb8b43769aa34a602b554cd5a23c1

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
