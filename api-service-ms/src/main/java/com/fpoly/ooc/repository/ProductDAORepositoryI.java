package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.responce.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDAORepositoryI extends JpaRepository<Product, Long> {
    @Query("Select od.id as productDetailId, o.productName as productName, o.status as status, sum(od.quantity) as " +
            "quantity from Product o join ProductDetail od on od.product.id = o.id group by o.productName, " +
            "o.status, od.id")
    public Page<ProductResponse> getProducts(Pageable pageable);
}
