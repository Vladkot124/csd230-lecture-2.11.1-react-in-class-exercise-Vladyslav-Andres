package csd230.seeder;

import csd230.entities.UserEntity;
import csd230.entities.UserRole;
import csd230.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.findByEmail("admin@bookstore.com").isEmpty()) {
            userRepository.save(new UserEntity(
                    "admin@bookstore.com",
                    passwordEncoder.encode("admin123"),
                    UserRole.ROLE_ADMIN
            ));
        }

        if (userRepository.findByEmail("user@bookstore.com").isEmpty()) {
            userRepository.save(new UserEntity(
                    "user@bookstore.com",
                    passwordEncoder.encode("user123"),
                    UserRole.ROLE_USER
            ));
        }
    }
}