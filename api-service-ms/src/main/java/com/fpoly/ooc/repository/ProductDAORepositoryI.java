package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.responce.product.ProductPromotionResponse;
import com.fpoly.ooc.responce.product.ProductResponse;
import com.fpoly.ooc.responce.product.ProductTableResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query("select new com.fpoly.ooc.responce.product.ProductPromotionResponse(" +
            "p.id, p.productName, p.imgDefault, sum(bd.quantity), min(pd.price), max(pd.price), sum(pd.quantity)) " +
            "from Product p " +
            "left join ProductDetail pd on p.id = pd.product.id " +
            "left join BillDetail bd on pd.id = bd.productDetail.id " +
            "group by p.id, p.productName, p.imgDefault")
    Page<ProductPromotionResponse> findProductPromotion(Pageable pageable);

    @Query("SELECT new java.lang.Long(product.id) " +
            " FROM ProductDetail pd " +
            "left join PromotionProduct pp on pd.id = pp.productDetailId.id " +
            "left join Promotion p on p.id = pp.promotion.id " +
            "left join Product  product on product.id = pd.product.id " +
            "where p.id = ?1 " +
            "group by product.id")
    List<Long> findAllByIdPromotion(Long promotionId);

}
