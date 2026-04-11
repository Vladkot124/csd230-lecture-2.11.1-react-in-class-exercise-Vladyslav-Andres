package csd230;

import csd230.entities.UserEntity;
import csd230.entities.UserRole;
import csd230.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner initUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("admin@admin.com").isEmpty()) {
                UserEntity admin = new UserEntity(
                        "admin@admin.com",
                        passwordEncoder.encode("admin"),
                        UserRole.ROLE_ADMIN
                );
                userRepository.save(admin);
                System.out.println("✅ Admin user created: admin@admin.com / admin");
            }

            if (userRepository.findByEmail("user@user.com").isEmpty()) {
                UserEntity user = new UserEntity(
                        "user@user.com",
                        passwordEncoder.encode("user"),
                        UserRole.ROLE_USER
                );
                userRepository.save(user);
                System.out.println("✅ User created: user@user.com / user");
            }
        };
    }
}