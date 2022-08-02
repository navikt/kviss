
export default {
    API_URL: process.env.API_URL || 'http://localhost:8080',
    IS_PROD_CLUSTER: process.env.NAIS_CLUSTER !== 'prod-gcp'
}
