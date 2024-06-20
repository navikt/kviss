FROM cgr.dev/chainguard/jre-lts:latest@sha256:82aa4eae901d072572b9ebd2733f9923d6cf2e1925051f3598a84950dd325c92

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
