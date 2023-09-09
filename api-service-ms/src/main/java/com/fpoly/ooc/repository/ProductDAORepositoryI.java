package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.responce.product.ProductResponse;
import com.fpoly.ooc.responce.product.ProductResponseEdit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDAORepositoryI extends JpaRepository<Product, Long> {
    @Query("Select o.id as id, o.productName as productName, o.category.categoryName as categoryName, o.status as status from Product o")
    public Page<ProductResponse> getProducts(Pageable pageable);

    @Query("Select o.brand.id as brandId, o.category.id as categoryId, o.productName as productName, o.productCode as productCode" +
            ",o.status as status from Product o where o.id=?1 ")
    public ProductResponseEdit getProduct(Long id);

}
