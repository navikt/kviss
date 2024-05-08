FROM cgr.dev/chainguard/jre-lts:latest@sha256:1734e931812f1872d520bee1fba1f6a4448dfdfa1c42d20c513066790c670f59

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
