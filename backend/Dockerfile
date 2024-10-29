FROM cgr.dev/chainguard/jre:latest@sha256:b3d87ec2bc7a6272f1b3a76fcb5594c9c941b80d3720b7f2d15c32523bf25a3d

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
