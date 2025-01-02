FROM cgr.dev/chainguard/jre:latest@sha256:55894218bf9617e3849beede3e06ea4d263685b7916a532892320cc1de338e7d

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
