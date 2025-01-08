FROM cgr.dev/chainguard/jre:latest@sha256:d5fff7db44891256a61e22f97df1a56e9420fb73721533ad8e37455618515783

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
