package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.responce.product.ProductResponse;
import com.fpoly.ooc.responce.product.ProductTableResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDAORepositoryI extends JpaRepository<Product, Long> {
    @Query("Select o.id as id, o.productName as productName, o.status as status, " +
            "o.imgDefault as imgDefault, o.createdAt as createdAt," +
            "count(od) as quantity from Product o left join ProductDetail od on od.product.id = o.id" +
           " group by o.id, o.productName, o.status, o.imgDefault, o.createdAt")
    public Page<ProductTableResponse> getProductsTable(Pageable pageable);

    @Query("Select o.id as id, o.productCode as productCode, o.productName as productName, o.brand as brand" +
            ",o.category as category, o.pattern as pattern, o.form as form, o.status as status, " +
            "o.imgDefault as imgDefault, o.description as description from Product o where o.id=?1")
    public ProductResponse getProductResponseById(Long id);
    public Product findFirstByProductCode(String productCode);
}
