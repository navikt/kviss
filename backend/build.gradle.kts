import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar
import org.cyclonedx.gradle.CycloneDxTask

val ktor_version = "2.3.10"
val kotlin_version = "1.9.23"
val logback_version = "1.5.6"
val postgresql_version = "42.7.3"
val hikariCP_version = "5.1.0"
val flyway_core_version = "10.11.1"
val mockk_version = "1.13.10"
val junit_jupiter_version = "5.10.2"


plugins {
    kotlin("jvm") version "1.9.23"
    id("org.jetbrains.kotlin.plugin.serialization") version "1.9.23"
    id("com.github.johnrengelman.shadow") version "8.1.1"
    id("org.cyclonedx.bom") version "1.8.2"
}

group = "nav.no"

val mainClass = "nav.no.ApplicationKt"

kotlin {
    jvmToolchain(21)
}

tasks {

    withType<Test> {
        useJUnitPlatform()
        testLogging {
            events("skipped", "failed")
        }
    }

    withType<Wrapper> {
        gradleVersion = "8.7"
    }

    withType<ShadowJar> {
        archiveBaseName.set("app")
        archiveClassifier.set("")
        manifest {
            attributes(
                mapOf(
                    "Main-Class" to mainClass
                )
            )
        }
        mergeServiceFiles()
        finalizedBy(cyclonedxBom)
    }

    withType<CycloneDxTask> {
        setOutputFormat("json")
        setOutputName("bom")
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-websockets:$ktor_version")
    implementation("io.ktor:ktor-server-core-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-content-negotiation-jvm:$ktor_version")
    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-netty-jvm:$ktor_version")
    implementation("ch.qos.logback:logback-classic:$logback_version")
    implementation("org.postgresql:postgresql:$postgresql_version")
    implementation("com.zaxxer:HikariCP:$hikariCP_version")
    implementation("org.flywaydb:flyway-database-postgresql:$flyway_core_version")
    implementation("io.ktor:ktor-server-cors:$ktor_version")
    testImplementation("io.mockk:mockk:$mockk_version")
    testImplementation("io.ktor:ktor-server-tests-jvm:$ktor_version")
    testImplementation("org.junit.jupiter:junit-jupiter-api:$junit_jupiter_version")
    testImplementation("org.junit.jupiter:junit-jupiter-params:$junit_jupiter_version")
    testImplementation("org.junit.jupiter:junit-jupiter-engine:$junit_jupiter_version")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
}
