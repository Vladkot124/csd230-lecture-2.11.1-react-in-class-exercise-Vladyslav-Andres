package csd230.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("LAPTOP")
public class LaptopEntity extends ProductEntity {
    private String brand;
    private String model;
    private double price;
    private int stock;

    public LaptopEntity() {}

    public LaptopEntity(String brand, String model, double price, int stock) {
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.stock = stock;
    }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    @Override
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    @Override
    public void sellItem() {
        if (stock > 0) {
            stock--;
        }
    }
}