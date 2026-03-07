package csd230.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public abstract class PublicationEntity extends ProductEntity {
    private String title;
    @Column(name = "pub_price") private double price;
    private int copies;
    public PublicationEntity() {}
    public PublicationEntity(String t, double p, int c) { this.title = t; this.price = p; this.copies = c; }

    @Override public void sellItem() {
        if (copies > 0) { copies--; System.out.println("Sold '" + title + "'. Remaining copies: " + copies); }
        else { System.out.println("Cannot sell '" + title + "'. Out of stock."); }
    }
    @Override public double getPrice() { return price; }

    public String getTitle() { return title; }
    public void setTitle(String t) { this.title = t; }
    public void setPrice(double p) { this.price = p; }
    public int getCopies() { return copies; }
    public void setCopies(int c) { this.copies = c; }
    @Override public String toString() { return "Pub{title='" + title + "', price=" + price + ", copies=" + copies + "}"; }
}
