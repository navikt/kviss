val ktor_version = "3.3.1"
val kotlin_version = "2.2.21"
val logback_version = "1.5.20"
val postgresql_version = "42.7.8"
val hikariCP_version = "7.0.2"
val flyway_core_version = "11.15.0"
val mockk_version = "1.14.6"
val junit_version = "6.0.0"

plugins {
    kotlin("jvm") version "2.2.21"
    id("application")
    id("org.jetbrains.kotlin.plugin.serialization") version "2.2.21"
}

application {
    mainClass.set("nav.no.ApplicationKt")
    applicationName = "app"

}

kotlin {
    jvmToolchain(21)
}

repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-websockets:$ktor_version")
    implementation("io.ktor:ktor-server-core-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-content-negotiation-jvm:$ktor_version")
    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-netty-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-cors:$ktor_version")

    implementation("ch.qos.logback:logback-classic:$logback_version")

    implementation("org.postgresql:postgresql:$postgresql_version")
    implementation("com.zaxxer:HikariCP:$hikariCP_version")
    implementation("org.flywaydb:flyway-database-postgresql:$flyway_core_version")

    testImplementation("io.mockk:mockk:$mockk_version")
    testImplementation("io.ktor:ktor-server-test-host-jvm:$ktor_version")
    testImplementation(platform("org.junit:junit-bom:$junit_version"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
}


tasks {
    withType<Test> {
        useJUnitPlatform()
        testLogging {
            events("skipped", "failed")
        }
    }

    withType<Wrapper> {
        gradleVersion = "9.0.0"
    }
}
