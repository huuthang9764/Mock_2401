package MockProjectBackEnd.Configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ComponentConfiguration implements WebMvcConfigurer {

    @Bean
    public ModelMapper initModelMapper() {
        return new ModelMapper();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/auth/signin")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST")
                .allowCredentials(true);

        registry.addMapping("/admin/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "DELETE", "PATCH")
                .allowCredentials(true);

        registry.addMapping("/ceo/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "DELETE", "PATCH")
                .allowCredentials(true);

        registry.addMapping("/manager/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "DELETE", "PATCH")
                .allowCredentials(true);

        registry.addMapping("/TaiKhoan?&pageSize=10000000")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "DELETE", "PATCH")
                .allowCredentials(true);

        registry.addMapping("/TaiKhoan?&pageSize=10000000")
                .allowedOrigins("http://localhost:5173/dashboard/CEO/staffManage")
                .allowedMethods("GET", "POST", "DELETE", "PATCH")
                .allowCredentials(true);

//        registry.addMapping("/SanPham**")
//                .allowedOrigins("http://localhost:5173")
//                .allowedMethods("GET", "POST", "DELETE", "PATCH")
//                .allowCredentials(true);

        registry.addMapping("/auth/refresh")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("POST")
                .allowCredentials(true);
    }
}