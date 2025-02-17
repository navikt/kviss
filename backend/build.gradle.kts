import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

val ktor_version = "2.3.13"
val kotlin_version = "2.1.10"
val logback_version = "1.5.16"
val postgresql_version = "42.7.5"
val hikariCP_version = "6.2.1"
val flyway_core_version = "11.3.2"
val mockk_version = "1.13.16"
val junit_jupiter_version = "5.11.4"


plugins {
    kotlin("jvm") version "2.1.10"
    id("org.jetbrains.kotlin.plugin.serialization") version "2.1.10"
    id("com.github.johnrengelman.shadow") version "8.1.1"
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
        gradleVersion = "8.6"
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
