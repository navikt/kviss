FROM cgr.dev/chainguard/jre:latest@sha256:de34b1e3274e3756052a7d61f0947d109f7fe577ec2e35fe9fff659581b62e9e

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
