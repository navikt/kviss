FROM cgr.dev/chainguard/jre-lts:latest@sha256:82cf98c3c33fb17ded27fa13056bd4588bda367acdb339f4a4049d74293b7289

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
