FROM cgr.dev/chainguard/jre:latest@sha256:0d40f97e101f147566e850a6dc0fcf39e7709e517b0ecec66ff8fe657b08ea50

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
