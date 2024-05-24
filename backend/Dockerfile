FROM cgr.dev/chainguard/jre-lts:latest@sha256:dd53fb1a06145ac7bf42e471e196f5ea80fb937b2eda25cd59a3763b1ae40e35

COPY build/libs/app.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
