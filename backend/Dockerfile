FROM cgr.dev/chainguard/jre:latest@sha256:61ff3dddc114515366cb475d945fad4df05f5fcaf4dbe642ee224921acc7ea35

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
