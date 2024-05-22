FROM cgr.dev/chainguard/jre-lts:latest@sha256:c3d5d6b02a629fdf7f9a4e72dc2ba58f9912eff5070b63c79ba037c011470680

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
