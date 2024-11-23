# Usar uma imagem base do Maven com OpenJDK
FROM maven:3.8.4-openjdk-17 AS build

# Diretório de trabalho no container
WORKDIR /app

# Copiar apenas o arquivo pom.xml para baixar dependências
COPY pom.xml /app

# Baixar dependências do Maven para cache
RUN mvn dependency:go-offline

# Copiar o restante do projeto para o container
COPY src /app/src

# Executar o comando para compilar e empacotar o projeto
RUN mvn clean package -DskipTests

# Usar uma imagem base mais leve para rodar o jar final
FROM openjdk:17-jdk-alpine

# Diretório de trabalho no container
WORKDIR /app

# Copiar o jar gerado para o container
COPY --from=build /app/target/*.jar app.jar

# Comando para rodar a aplicação
CMD ["java", "-jar", "app.jar"]
