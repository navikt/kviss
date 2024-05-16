FROM cgr.dev/chainguard/jre-lts:latest@sha256:ce8914e97e6d7752469b6dc4721906fa5af93c2b406e1303646829dabe852684

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
