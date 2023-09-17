package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.util.List;

@Repository
public interface ProductDetailDAORepositoryI extends JpaRepository<ProductDetail, Long> {
    @Query("select pd.id as id, pd.product as product, pd.button as button, pd.material as material" +
            ", pd.collar as collar, pd.sleeve as sleeve, pd.size as size, pd.color as color" +
            ", pd.shirtTail as shirtTail, pd.price as price, pd.quantity as quantity," +
            "pd.descriptionDetail as descriptionDetail from ProductDetail pd where  pd.product.id=?1")
    public List<ProductDetailResponse> getProductDetailsByIdProduct(Long idPro);

    @Query("select distinct pd.button as button, pd.material as material, pd.shirtTail as shirtTail" +
            ", pd.collar as collar, pd.sleeve as sleeve, pd.descriptionDetail as descriptionDetail" +
            " from ProductDetail pd where  pd.product.id=?1")
    public List<ProductDetailResponse> getProductDetailsTableByIdProduct(Long idPro);
}
