package csd230.controllers;

import csd230.entities.LaptopEntity;
import csd230.repositories.LaptopRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/laptops")
@CrossOrigin(origins = "*")
public class LaptopController {

    private final LaptopRepository laptopRepository;

    public LaptopController(LaptopRepository laptopRepository) {
        this.laptopRepository = laptopRepository;
    }

    @GetMapping
    public List<LaptopEntity> getAllLaptops() {
        return laptopRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LaptopEntity> getLaptopById(@PathVariable Long id) {
        return laptopRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public LaptopEntity createLaptop(@RequestBody LaptopEntity laptop) {
        return laptopRepository.save(laptop);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LaptopEntity> updateLaptop(@PathVariable Long id, @RequestBody LaptopEntity laptopDetails) {
        return laptopRepository.findById(id).map(laptop -> {
            laptop.setBrand(laptopDetails.getBrand());
            laptop.setModel(laptopDetails.getModel());
            laptop.setPrice(laptopDetails.getPrice());
            laptop.setStock(laptopDetails.getStock());
            return ResponseEntity.ok(laptopRepository.save(laptop));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLaptop(@PathVariable Long id) {
        if (laptopRepository.existsById(id)) {
            laptopRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}