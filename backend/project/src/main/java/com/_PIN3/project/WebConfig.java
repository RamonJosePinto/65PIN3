package com._PIN3.project;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Aplica CORS a todos os endpoints
                        .allowedOrigins("http://localhost:3000") // Altere para o frontend ou use "*" para permitir qualquer origem
                        .allowedMethods("*") // Permite métodos específicos
                        .allowedHeaders("*")
                        .allowCredentials(true); // Permite credenciais, se necessário
            }
        };
    }
}
