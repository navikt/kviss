FROM cgr.dev/chainguard/jre:latest@sha256:e8ff25b08361fb5d9533a95f33c975988aa90bc8286eb1b94b6612f197063562

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
