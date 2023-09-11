package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.responce.product.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDAORepositoryI extends JpaRepository<Product, Long> {
    @Query("Select o.id as id, o.brand.id as brandId, o.category.id as categoryId," +
            " o.productName as productName, o.productCode as productCode" +
            ",o.status as status, o.imgDefault as imgDefault, o.createdAt as createdAt, o.createdBy as createdBy" +
            ", o.description as description from Product o ")
    public Page<ProductResponse> getProducts(Pageable pageable);

    @Query("Select o.id as id, o.brand.id as brandId, o.category.id as categoryId," +
            " o.productName as productName, o.productCode as productCode" +
            ",o.status as status, o.imgDefault as imgDefault, o.createdAt as createdAt, o.createdBy as createdBy" +
            ", o.description as description from Product o where o.id=?1 ")
    public ProductResponse getProduct(Long id);

}
