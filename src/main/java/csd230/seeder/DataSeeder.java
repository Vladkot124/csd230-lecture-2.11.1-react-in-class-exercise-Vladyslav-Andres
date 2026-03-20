package csd230.seeder;

import csd230.entities.BookEntity;
import csd230.entities.LaptopEntity;
import csd230.entities.MagazineEntity;
import csd230.repositories.BookRepository;
import csd230.repositories.LaptopRepository;
import csd230.repositories.MagazineRepository;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final LaptopRepository laptopRepository;
    private final Faker faker;

    public DataSeeder(BookRepository bookRepository, MagazineRepository magazineRepository, LaptopRepository laptopRepository) {
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.laptopRepository = laptopRepository;
        this.faker = new Faker();
    }

    @Override
    public void run(String... args) {
        if (bookRepository.count() == 0) seedBooks();
        if (magazineRepository.count() == 0) seedMagazines();
        if (laptopRepository.count() == 0) seedLaptops();
    }

    private void seedBooks() {
        for (int i = 0; i < 10; i++) {
            BookEntity book = new BookEntity(
                    faker.book().title(),
                    faker.number().randomDouble(2, 10, 100),
                    faker.number().numberBetween(1, 50),
                    faker.book().author()
            );
            bookRepository.save(book);
        }
    }

    private void seedMagazines() {
        for (int i = 0; i < 5; i++) {
            LocalDateTime issueDate = faker.date().past(365, TimeUnit.DAYS)
                    .toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

            MagazineEntity mag = new MagazineEntity(
                    faker.book().publisher() + " Weekly",
                    faker.number().randomDouble(2, 5, 20),
                    faker.number().numberBetween(10, 100),
                    faker.number().numberBetween(100, 500),
                    issueDate
            );
            magazineRepository.save(mag);
        }
    }

    private void seedLaptops() {
        String[] brands = {"Dell", "HP", "Lenovo", "Asus", "Acer", "MSI"};

        for (int i = 0; i < 5; i++) {
            LaptopEntity laptop = new LaptopEntity(
                    brands[faker.number().numberBetween(0, brands.length)],
                    "Model-" + faker.number().numberBetween(100, 999),
                    faker.number().randomDouble(2, 600, 2500),
                    faker.number().numberBetween(1, 25)
            );
            laptopRepository.save(laptop);
        }
    }
}