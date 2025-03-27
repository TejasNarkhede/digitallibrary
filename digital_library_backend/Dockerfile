# Use an official Maven image to build the Spring Boot app
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml .
RUN mvn dependency:resolve

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Use an official OpenJDK image to run the application
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the application's jar file to the container
COPY --from=build /app/target/digital_library_backend-0.0.1-SNAPSHOT.jar .

# Expose the port the application runs on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app/digital_library_backend-0.0.1-SNAPSHOT.jar"]