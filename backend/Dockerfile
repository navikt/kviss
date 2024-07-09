FROM cgr.dev/chainguard/jre-lts:latest@sha256:b5df7697d7d2088e32ea4d3b6f5d0254881b5cd12748a3d6b94bd7f1878ea9cd

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
