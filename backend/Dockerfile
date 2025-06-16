FROM cgr.dev/chainguard/jre:latest@sha256:cf2821e9754fda9996cf1ff675ed296156c2ab8a04a9ef3a93989c6e0ceac522

COPY build/libs/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
