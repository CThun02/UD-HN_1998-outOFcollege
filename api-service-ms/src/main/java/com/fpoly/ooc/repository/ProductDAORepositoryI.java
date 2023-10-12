package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.responce.product.ProductResponse;
import com.fpoly.ooc.responce.product.ProductTableResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductDAORepositoryI extends JpaRepository<Product, Long> {
    @Query("Select o.id as id, o.productCode as productCode, o.productName as productName, o.status as status, " +
            "o.imgDefault as imgDefault, o.brand as brand, o.category as category," +
            "o.description as description, " +
            "count(od) as quantity from Product o left join ProductDetail od on " +
            "od.product.id = o.id WHERE (o.brand.id = ?1 OR ?1 IS NULL)" +
            " AND (o.category.id = ?2 OR ?2 IS NULL)" +
            " AND (o.status=?3 or ?3 is NULL)" +
            "group by o.id, o.productName, o.status, o.imgDefault, o.brand, o.category," +
            "o.description, o.productCode, o.createdAt  " +
            "order by o.createdAt desc ")
    public List<ProductTableResponse> getProductFilterByCom(Long brandId, Long categoryId, String status);

    @Query("Select o.id as id, o.productCode as productCode, o.productName as productName, o.status as status, " +
            "o.imgDefault as imgDefault, o.brand as brand, o.category as category," +
            "o.description as description, " +
            "count(od) as quantity from Product o left join ProductDetail od on " +
            "od.product.id = o.id where o.status=?1 or o.status =?2" +
           " group by o.id, o.productName, o.status, o.imgDefault, o.brand, o.category," +
            "o.description, o.productCode, o.createdAt  " +
            "order by o.createdAt desc ")
    public List<ProductTableResponse> getProductsTable(String status1, String status2);

    @Query("Select o.id as id, o.productCode as productCode, o.productName as productName, o.status as status, " +
            "o.imgDefault as imgDefault, o.brand as brand, o.category as category," +
            "o.description as description, " +
            "count(od) as quantity from Product o left join ProductDetail od on " +
            "od.product.id = o.id where (o.status=?1 or ?1 is null)" +
            " group by o.id, o.productName, o.status, o.imgDefault, o.brand, o.category," +
            " o.description, o.productCode having count(od) =0")
    public List<ProductTableResponse> getProductCreateDetail(String status);

    @Query("Select o.id as id, o.productCode as productCode, o.productName as productName, o.brand as brand" +
            ",o.category as category, o.status as status, " +
            "o.imgDefault as imgDefault, o.description as description from Product o where o.id=?1")
    public ProductResponse getProductResponseById(Long id);
    public Product findFirstByProductCode(String productCode);
}
