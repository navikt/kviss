FROM gcr.io/distroless/nodejs22-debian12@sha256:653391e7669b603b0306b785b1ce886f85602e3fb7311bfb0cfadc583bcc2fff

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app
COPY dist dist/
COPY server server/

WORKDIR server
EXPOSE 8080
CMD ["dist/index.js"]