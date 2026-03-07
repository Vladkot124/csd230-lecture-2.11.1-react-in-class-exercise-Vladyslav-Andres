package csd230.controllers;

import csd230.entities.BookEntity;
import csd230.repositories.BookRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/magazines")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite React App
public class MagazineController {

    private final BookRepository magazineRepository;

    public MagazineController(BookRepository magazineRepository) {
        this.magazineRepository = magazineRepository;
    }

    // GET all magazines
    @GetMapping
    public List<BookEntity> getAllBooks() {
        return magazineRepository.findAll();
    }

    // GET single magazine
    @GetMapping("/{id}")
    public ResponseEntity<BookEntity> getBookById(@PathVariable Long id) {
        return magazineRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST create magazine
    @PostMapping
    public BookEntity createBook(@RequestBody BookEntity magazine) {
        return magazineRepository.save(magazine);
    }

    // PUT update magazine
    @PutMapping("/{id}")
    public ResponseEntity<BookEntity> updateBook(@PathVariable Long id, @RequestBody BookEntity magazineDetails) {
        return magazineRepository.findById(id).map(magazine -> {
            magazine.setTitle(magazineDetails.getTitle());
            magazine.setAuthor(magazineDetails.getAuthor());
            magazine.setPrice(magazineDetails.getPrice());
            magazine.setCopies(magazineDetails.getCopies());
            return ResponseEntity.ok(magazineRepository.save(magazine));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE magazine
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        if (magazineRepository.existsById(id)) {
            magazineRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}