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
    @Query("Select o.id as id, o.productCode as productCode, o.productName as productName," +
            " o.status as status, o.description as description, " +
            "sum(od.quantity) as quantity from Product o left join ProductDetail od on " +
            "od.product.id = o.id WHERE (o.status=?1 or ?1 is NULL) and (o.productCode like ?2" +
            " or o.productName like ?2 or ?2 is NULL)" +
            "group by o.id, o.productName, o.status, " +
            "o.description, o.productCode, o.createdAt  " +
            "order by o.createdAt desc ")
    public List<ProductTableResponse> getProductFilterByCom(String status, String keywords);

    public Product getProductByProductName(String name);

    @Query("Select o.id as id, o.productCode as productCode, o.productName as productName" +
            ", o.status as status, o.description as description from Product o where o.id=?1")
    public ProductResponse getProductResponseById(Long id);
    public Product findFirstByProductCode(String productCode);

    @Query(name = "Product.findProductPromotion", nativeQuery = true)
    List<ProductPromotionResponse> findProductPromotion();

    @Query("SELECT new java.lang.Long(product.id) " +
            " FROM ProductDetail pd " +
            "left join PromotionProduct pp on pd.id = pp.productDetailId.id " +
            "left join Promotion p on p.id = pp.promotion.id " +
            "left join Product  product on product.id = pd.product.id " +
            "where p.id = ?1 " +
            "group by product.id")
    List<Long> findAllByIdPromotion(Long promotionId);

}
