FROM cgr.dev/chainguard/jre-lts:latest@sha256:326aa0a614b66c681808566493edefd234262ce6753b951be08092b583ab8111

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
