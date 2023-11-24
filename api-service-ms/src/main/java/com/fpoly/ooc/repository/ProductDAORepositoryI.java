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
            "count(od) as quantity from Product o left join ProductDetail od on " +
            "od.product.id = o.id WHERE (o.status=?1 or ?1 is NULL) and (o.productCode like ?2" +
            " or o.productName like ?2 or ?2 is NULL)" +
            "group by o.id, o.productName, o.status, " +
            "o.description, o.productCode, o.createdAt  " +
            "order by o.createdAt desc ")
    public List<ProductTableResponse> getProductFilterByCom(String status, String keywords);

    @Query("Select o.id as id, o.productCode as productCode, o.productName as productName" +
            ", o.status as status, o.description as description from Product o where o.id=?1")
    public ProductResponse getProductResponseById(Long id);
    public Product findFirstByProductCode(String productCode);

    @Query("select new com.fpoly.ooc.responce.product.ProductPromotionResponse(" +
            "p.id, p.productName, sum(bd.quantity), min(pd.price), max(pd.price), " +
            "sum(case when pd.quantity > 0 then pd.quantity else 0 end)) from Product p " +
            "left join ProductDetail pd on p.id = pd.product.id " +
            "left join BillDetail bd on pd.id = bd.productDetail.id " +
            "group by p.id, p.productName " +
            "having sum(pd.quantity) > 0 ")
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
