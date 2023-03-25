# Use a base image with Java 11 installed
FROM openjdk:11-jre-slim

# Set the working directory to /app
WORKDIR /app

# Copy the packaged Spring Boot JAR file to the container
COPY target/backend-spring-0.0.1-SNAPSHOT.jar .

# Expose port 8080 for the Spring Boot application to listen on
EXPOSE 8080

# Set the database connection properties as environment variables
ENV SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/db_aanvragen
ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=groep-8

# Run the Spring Boot application when the container starts
CMD ["java", "-jar", "backend-spring-0.0.1-SNAPSHOT.jar"]