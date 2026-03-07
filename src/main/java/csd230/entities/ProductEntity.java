package csd230.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "products")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "product_type", discriminatorType = DiscriminatorType.STRING)
public abstract class ProductEntity implements Serializable, SaleableItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // --- ADD THIS METHOD ---
    // This allows Thymeleaf to access "${product.productType}" safely
    public String getProductType() {
        return this.getClass().getSimpleName();
    }

    @Override
    public String toString() {
        return "ProductEntity{" +
                "id=" + id +
                "} : "+super.toString();
    }
}