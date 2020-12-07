#The first way

FROM maven:3.6.3-jdk-11
COPY ./ ./
RUN mvn clean package -DskipTests
CMD ["java", "-jar", "target/cargo-0.0.1-SNAPSHOT.jar"]

#The second way (created by Vladislav)

### Build stage ##
#FROM openjdk:11 AS build
#WORKDIR /workspace/app
#
##Copy sources for jar file creating
#COPY mvnw .
#COPY .mvn .mvn
#COPY pom.xml .
#COPY src src
#
##Create jar file
#RUN ./mvnw install -DskipTests
#
##Unpack into target/dependency dir
#RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)
#
### Run stage ##
#FROM openjdk:11
#ARG DEPENDENCY_PATH=/workspace/app/target/dependency
#
##Copy compiled sources for execution
#COPY --from=build ${DEPENDENCY_PATH}/BOOT-INF/lib /app/lib
#COPY --from=build ${DEPENDENCY_PATH}/BOOT-INF/classes /app
#COPY --from=build ${DEPENDENCY_PATH}/META-INF /app/META-INF
#
##Execution
#ENTRYPOINT ["java", "-cp", "app:app/lib/*", "by.itechart.cargo.CargoApplication"]